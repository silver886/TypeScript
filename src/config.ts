/* eslint-disable import/no-nodejs-modules */
import {env} from 'process';
import dotenv from 'dotenv';

dotenv.config();

export enum ExitCode {
    SERVER_CLOSE = 0,
    SIGINT_SERVER_NOT_CLOSE = 1,
    CRASH = 255,
}

export const HOST = (env.HOST ?? '') || '127.0.0.1';
// eslint-disable-next-line @typescript-eslint/no-magic-numbers
export const PORT = parseInt(env.PORT ?? '', 10) || 8080;
