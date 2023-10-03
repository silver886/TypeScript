/* eslint-disable import/no-nodejs-modules */
import {cp, readdir, rm} from 'node:fs';
import {join} from 'node:path';
import {promisify} from 'node:util';
import {build} from 'esbuild';

const CONFIG = {
   src: {
      dir: 'src',
      file: 'index.ts',
   },
   dest: {
      dir: 'dist',
      file: 'index.js',
   },
   assets: [
      {
         src: join('node_modules', 'swagger-ui-dist'),
         dest: '.',
         include: [/favicon/u, /swagger-ui/u],
         exclude: [/\.map/u, /-es-/u],
      },
   ],
};

// Clear output directory.
try {
   for await (const item of await promisify(readdir)(CONFIG.dest.dir)) {
      await promisify(rm)(join(CONFIG.dest.dir, item), {
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
   outfile: join(CONFIG.dest.dir, CONFIG.dest.file),
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
            join(CONFIG.dest.dir, asset.dest, item),
         );
      }
   }
}
