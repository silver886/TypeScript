import {getIp, getPtr} from '@@apis/icanhaz';
import type {PingRequestBody, PingResponse} from '@@models/ping';

export async function ping(body: PingRequestBody, ip?: 'v4' | 'v6'): Promise<PingResponse> {
    return {
        echo:   body.echo,
        server: {
            ip:  await getIp(ip),
            ptr: await getPtr(),
        },
    };
}
