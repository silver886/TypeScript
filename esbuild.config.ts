/* eslint-disable import/no-nodejs-modules */
import {cp, readdir, rm} from 'node:fs';
import {join} from 'node:path';
import {argv} from 'node:process';
import {promisify} from 'node:util';
import {build} from 'esbuild';
import yargs from 'yargs';

const ARGS = await yargs(argv)
   .usage(
      'Usage: ts-node --compilerOptions=\'{"module":"ESNext"}\' --esm esbuild.config.ts [flags]',
   )
   .option('srcDir', {
      type: 'string',
      desc: 'Path of source code directory',
      requiresArg: true,
      default: 'src',
   })
   .option('srcFile', {
      type: 'string',
      desc: 'Path of entry file, related to source code directory',
      requiresArg: true,
      default: 'index.ts',
   })
   .option('distDir', {
      type: 'string',
      desc: 'Path of distribution directory',
      requiresArg: true,
      default: 'dist',
   })
   .option('distFile', {
      type: 'string',
      desc: 'Path of distribution file, related to distribution directory',
      requiresArg: true,
      default: 'index.js',
   })
   .option('asset', {
      type: 'string',
      desc: 'JSON format of asset configuration',
      requiresArg: true,
      default: JSON.stringify({
         src: join('node_modules', 'swagger-ui-dist'),
         dest: '.',
         include: ['favicon', 'swagger-ui'],
         exclude: ['.map', '-es-'],
      }),
   })
   .array('asset')
   .version(false)
   .parse();

const CONFIG = {
   src: {
      dir: ARGS.srcDir,
      file: ARGS.srcFile,
   },
   dist: {
      dir: ARGS.distDir,
      file: ARGS.distFile,
   },
   assets: ARGS.asset.map((v) => {
      interface Asset {
         src: string;
         dest: string;
         include: RegExp[];
         exclude: RegExp[];
      }

      const rawAssetConfig = JSON.parse(v) as Record<
         keyof Pick<Asset, 'exclude' | 'include'>,
         string[]
      > &
         Record<keyof Pick<Asset, 'dest' | 'src'>, string>;

      return {
         src: rawAssetConfig.src,
         dest: rawAssetConfig.dest,
         include: rawAssetConfig.include.map((w) => new RegExp(w, 'u')),
         exclude: rawAssetConfig.exclude.map((w) => new RegExp(w, 'u')),
      };
   }),
};

// Clear output directory.
try {
   for await (const item of await promisify(readdir)(CONFIG.dist.dir)) {
      await promisify(rm)(join(CONFIG.dist.dir, item), {
         force: true,
         recursive: true,
      });
   }
} catch (err) {
   if (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      !('code' in (err as any)) ||
      (err as {code?: string}).code !== 'ENOENT'
   ) {
      throw err;
   }
}

// Build with esbuild.
await build({
   entryPoints: [join(CONFIG.src.dir, CONFIG.src.file)],
   outfile: join(CONFIG.dist.dir, CONFIG.dist.file),
   bundle: true,
   platform: 'node',
});

// Copy assets.
for await (const asset of CONFIG.assets) {
   for await (const item of await promisify(readdir)(asset.src)) {
      if (
         asset.include.reduce((p, c) => p || c.test(item), false) &&
         !asset.exclude.reduce((p, c) => p || c.test(item), false)
      ) {
         await promisify(cp)(
            join(asset.src, item),
            join(CONFIG.dist.dir, asset.dest, item),
         );
      }
   }
}
