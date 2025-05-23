/* eslint-disable import-x/no-nodejs-modules, import-x/max-dependencies */
import http from 'node:http';
import {createId} from '@paralleldrive/cuid2';
import {ErrorContext} from '@silver886/error-context';
import {ValidateError} from '@tsoa/runtime';
import bodyParser from 'body-parser';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, {
   static as expressStatic,
   json,
   Router as router,
   urlencoded,
} from 'express';
import helmet from 'helmet';
import {StatusCodes} from 'http-status-codes';
import {getAbsoluteFSPath} from 'swagger-ui-dist';
import {serve, setup} from 'swagger-ui-express';
import {HeaderName} from './config';
import swagger from './openapi/swagger.json'; // eslint-disable-line import-x/extensions
import {RegisterRoutes as registerRoutes} from './routes/routes';
import type {BasicRequest} from '@@models/common';
import type {Express, NextFunction, Request, Response} from 'express';
import type {Server} from 'node:http';

// eslint-disable-next-line max-statements, max-lines-per-function
export const APP = ((): Express => {
   const app = express();

   app.use(
      cors({
         credentials: true,
      }),
   );
   app.use(
      bodyParser.json({
         limit: '8MB',
      }),
   );
   app.use(bodyParser.text());
   app.use(json());
   app.use(
      urlencoded({
         extended: false,
      }),
   );
   app.use(helmet());
   app.use(compression());
   app.use(cookieParser());
   app.use(
      (
         req: Partial<BasicRequest> & Request,
         res: Partial<BasicRequest> & Response,
         next: NextFunction,
      ): void => {
         const id = createId();
         req.id = id;
         res.append(HeaderName.REQUEST_ID, id);

         next();
      },
   );

   app.use(expressStatic(getAbsoluteFSPath()));

   const routing = router();
   routing.use('/api-doc', serve, setup(swagger));
   registerRoutes(routing);

   app.use('/', routing);

   app.use(
      (
         err: unknown,
         req: Request,
         res: Response,
         next: NextFunction,
         // eslint-disable-next-line max-params
      ): void => {
         if (err instanceof ValidateError) {
            // eslint-disable-next-line no-console
            console.error(`Caught Validation Error for ${req.path}:`, err);
            res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
               message: 'Validation Failed',
               details: err.fields,
            });
            return;
         }

         if (err instanceof ErrorContext) {
            // eslint-disable-next-line no-console
            console.error(`Caught Internal Server Error for ${req.path}:`, err);
            res.status(StatusCodes.SERVICE_UNAVAILABLE).json({
               requestId: err.context.requestId,
               message: 'Service Unavailable',
            });
            return;
         }

         if (err instanceof Error) {
            // eslint-disable-next-line no-console
            console.error(`Caught Unknown Error for ${req.path}:`, err);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
               message: 'Internal Server Error',
            });
            return;
         }

         next();
      },
   );

   return app;
})();

export function expressServer(): Server {
   // eslint-disable-next-line @typescript-eslint/no-misused-promises
   const server = http.createServer(APP);
   return server;
}
