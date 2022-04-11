/* eslint-disable new-cap */
import {Body, Controller, Example, Post, Query, Response, Route, Tags} from '@tsoa/runtime';
import {StatusCodes} from 'http-status-codes';
import {PingRequestBody} from '@@models/ping';
import {ping} from '@@services/ping';
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
    @Example<PingResponse>({
        echo:   'Hello from the outside',
        server: {
            ip:  '1.1.1.1',
            ptr: '1.1.1.1.in-addr.arpa',
        },
    })
    @Response<{message: string}>(StatusCodes.INTERNAL_SERVER_ERROR, 'Internal Server Error', {
        message: 'Internal Server Error',
    })
    @Post('/')
    public async ping(
        @Body() body: PingRequestBody,
            @Query() ip?: 'v4' | 'v6',
    ): Promise<PingResponse> {
        return ping(body, ip);
    }
}
