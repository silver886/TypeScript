import {get} from '@@utils/https';

export async function getIp(ip?: 'v4' | 'v6'): Promise<string> {
    return (await get(`${ip ? `ip${ip}.` : ''}icanhazip.com`)).trim();
}

export async function getPtr(): Promise<string> {
    return (await get('icanhazptr.com')).trim();
}

export async function getTrace(): Promise<string> {
    return (await get('icanhaztrace.com')).trim();
}

export async function getTraceRoute(): Promise<string> {
    return (await get('icanhaztraceroute.com')).trim();
}

export async function getEpoch(): Promise<string> {
    return (await get('icanhazepoch.com')).trim();
}
