/* eslint-disable new-cap */
import {ErrorContext} from '@silver886/error-context';
import {
   Body,
   Controller,
   Example,
   Post,
   Query,
   Request,
   Response,
   Route,
   Tags,
} from '@tsoa/runtime';
import {StatusCodes} from 'http-status-codes';
import {CompositeRequest} from '@@models/common';
import {PingRequestBody} from '@@models/ping';
import {ping} from '@@services/ping';
import type {BasicResponse} from '@@models/common';
import type {PingResponse} from '@@models/ping';

@Route('ping')
@Tags('Health')
export class PingController extends Controller {
   /**
    * Always response `echo` from body and IP address and PTR of server.
    *
    * @example body {
    *   "echo": "Hello from the outside"
    * }
    */
   // eslint-disable-next-line class-methods-use-this
   @Example<BasicResponse & PingResponse>({
      requestId: 'y29m5cwv2ev1x7janp0jtb83',
      echo: 'Hello from the outside',
      server: {
         ip: '1.1.1.1',
      },
   })
   @Response<BasicResponse & {message: string}>(
      StatusCodes.INTERNAL_SERVER_ERROR,
      'Internal Server Error',
      {
         requestId: 'cfs9gas6gxymjfuwmmvpf8f7',
         message: 'Internal Server Error',
      },
   )
   @Post('/')
   public async postPing(
      @Request() request: CompositeRequest,
      @Body() body: PingRequestBody,
      @Query() ip?: 'v4' | 'v6',
   ): Promise<BasicResponse & PingResponse> {
      try {
         return {
            ...(await ping(body, ip)),
            requestId: request.id,
         };
      } catch (err) {
         throw new ErrorContext(
            err instanceof Error ? err : new Error(err as string),
            {
               requestId: request.id,
               source: `[postPing] (${__filename})`,
               request,
               body,
               ip,
            },
         );
      }
   }
}
