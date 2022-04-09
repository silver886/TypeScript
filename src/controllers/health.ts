/* eslint-disable new-cap */
import {Controller, Get, Route, Tags} from '@tsoa/runtime';

@Route('health')
@Tags('Health')
export class HealthController extends Controller {
    /**
     * Health check for load balancer and any other services.
     */
    // eslint-disable-next-line class-methods-use-this
    @Get('/')
    public getHealth(): {status: 'ok'} {
        return {status: 'ok'};
    }
}
