/* eslint-disable new-cap */
import {Controller, Example, Get, Request, Route, Tags} from '@tsoa/runtime';
import {CompositeRequest} from '@@models/common';
import type {BasicResponse} from '@@models/common';

@Route('health')
@Tags('Health')
export class HealthController extends Controller {
   /**
    * Health check for load balancer and any other services.
    */
   // eslint-disable-next-line class-methods-use-this
   @Example<BasicResponse & {status: 'ok'}>({
      requestId: 'ubpc8df8mb24eus8otz0ryy2',
      status: 'ok',
   })
   @Get('/')
   public getHealth(
      @Request() request: CompositeRequest,
   ): BasicResponse & {status: 'ok'} {
      return {
         requestId: request.id,
         status: 'ok',
      };
   }
}
