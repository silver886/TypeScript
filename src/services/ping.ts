import {ErrorContext} from '@silver886/error-context';
import {getIp, getPtr} from '@@apis/icanhaz';
import type {PingRequestBody, PingResponse} from '@@models/ping';

export async function ping(body: PingRequestBody, ip?: 'v4' | 'v6'): Promise<PingResponse> {
    try {
        const gotIp = await getIp(ip);
        const gotPtr = await getPtr();
        return {
            echo:   body.echo,
            server: {
                ip:  gotIp,
                ptr: gotPtr,
            },
        };
    } catch (err) {
        throw new ErrorContext(err instanceof Error ? err : new Error(err as string), {
            source: `[ping] (${__filename})`,
            body,
            ip,
        });
    }
}
