/* eslint-disable import-x/no-nodejs-modules */
import {request} from 'node:https';
import {ErrorContext} from '@silver886/error-context';
import type {IncomingMessage} from 'node:http';

export async function get(host: string, path?: string): Promise<string> {
   return new Promise((resolve, reject) => {
      const req = request(
         {
            host,
            path,
         },
         (res: IncomingMessage) => {
            // eslint-disable-next-line @typescript-eslint/no-magic-numbers
            if (!res.statusCode || Math.floor(res.statusCode / 100) !== 2) {
               const httpStatusCode = res.statusCode?.toString();
               reject(
                  new ErrorContext(
                     new Error(httpStatusCode ?? 'HTTP status code unknown'),
                     {
                        source: `[get] (${__filename})`,
                        ...(httpStatusCode ? {httpStatusCode} : {}),
                        res,
                     },
                  ),
               );
               return;
            }

            const data: Uint8Array[] = [];

            res.on('data', (chunk) => {
               data.push(chunk as Uint8Array);
            });

            res.on('end', () => {
               resolve(Buffer.concat(data).toString());
            });
         },
      );

      req.on('error', (err) => {
         reject(
            new ErrorContext(err, {
               source: `[get] (${__filename})`,
               err,
            }),
         );
      });

      req.end();
   });
}
