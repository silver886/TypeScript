import {ErrorContext} from '@silver886/error-context';
import {get} from '@@utils/https';

export async function getIp(ip?: 'v4' | 'v6'): Promise<string> {
   try {
      return (await get(`${ip ? `ip${ip}.` : ''}icanhazip.com`)).trim();
   } catch (err) {
      throw new ErrorContext(
         err instanceof Error ? err : new Error(err as string),
         {
            source: `[getIp] (${__filename})`,
            ip,
         },
      );
   }
}
