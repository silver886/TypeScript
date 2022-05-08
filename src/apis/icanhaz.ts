/* eslint-disable import/no-nodejs-modules */
import {ErrorContext} from '@silver886/error-context';
import {get} from '@@utils/https';

export async function getIp(ip?: 'v4' | 'v6'): Promise<string> {
    try {
        return (await get(`${ip ? `ip${ip}.` : ''}icanhazip.com`)).trim();
    } catch (err) {
        throw new ErrorContext(err instanceof Error ? err : new Error(err as string), {
            source: `[getIp] (${__filename})`,
            ip,
        });
    }
}

export async function getPtr(): Promise<string> {
    try {
        return (await get('icanhazptr.com')).trim();
    } catch (err) {
        throw new ErrorContext(err instanceof Error ? err : new Error(err as string), {
            source: `[getPtr] (${__filename})`,
        });
    }
}

export async function getTrace(): Promise<string> {
    try {
        return (await get('icanhaztrace.com')).trim();
    } catch (err) {
        throw new ErrorContext(err instanceof Error ? err : new Error(err as string), {
            source: `[getTrace] (${__filename})`,
        });
    }
}

export async function getTraceRoute(): Promise<string> {
    try {
        return (await get('icanhaztraceroute.com')).trim();
    } catch (err) {
        throw new ErrorContext(err instanceof Error ? err : new Error(err as string), {
            source: `[getTraceRoute] (${__filename})`,
        });
    }
}

export async function getEpoch(): Promise<string> {
    try {
        return (await get('icanhazepoch.com')).trim();
    } catch (err) {
        throw new ErrorContext(err instanceof Error ? err : new Error(err as string), {
            source: `[getEpoch] (${__filename})`,
        });
    }
}
