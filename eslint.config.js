import {configs} from '@silver886/eslint-config';
import {defineConfig, globalIgnores} from 'eslint/config';
import prettierConfig from 'eslint-config-prettier/flat';
import prettierPlugin from 'eslint-plugin-prettier';
import globals from 'globals';

export default defineConfig({
   extends: [
      configs.typescript,
      prettierConfig,
      globalIgnores([
         '**/node_modules',
         '/.pnpm-store',
         '/lib',
         '/dist',
         '/jest-reports',
         // Ignore tsoa
         '/src/openapi',
         '/src/routes',
      ]),
   ],
   languageOptions: {
      globals: globals.node,
   },
   plugins: {
      prettierPlugin,
   },
   rules: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'prettierPlugin/prettier': ['error'],
   },
});
