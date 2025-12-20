/* eslint-disable import-x/no-nodejs-modules */
import {env} from 'node:process';
import {config} from '@dotenvx/dotenvx';

config();

export const EXIT_CODE = {
   sigintServerClose: 2,
   sigintServerCloseFail: 3,
   crash: 255,
} as const;

export const HEADER_NAME = {
   requestId: 'X-Request-ID',
} as const;

export const HOST = (env.HOST ?? '') || '127.0.0.1';
// eslint-disable-next-line @typescript-eslint/no-magic-numbers
export const PORT = parseInt(env.PORT ?? '', 10) || 8080;
