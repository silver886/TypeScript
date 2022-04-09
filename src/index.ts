/* eslint-disable import/no-nodejs-modules */
import {exit} from 'process';
import {ExitCode, HOST, PORT} from './config';
import {APP, expressServer} from './expressServer';
import type {Server} from 'http';
import type {AddressInfo} from 'net';

let HTTP_SERVER: Server | null = null;

process.on('SIGINT', () => {
    // eslint-disable-next-line no-console
    console.log('SIGINT signal received');
    // eslint-disable-next-line no-console
    console.log('Closing server . . .');
    HTTP_SERVER?.close(() => {
        // eslint-disable-next-line no-console
        console.log('Server closed');
        exit(ExitCode.SERVER_CLOSE);
    });
    exit(ExitCode.SIGINT_SERVER_NOT_CLOSE);
});

process.on('uncaughtException', (err) => {
    // eslint-disable-next-line no-console
    console.log(err);
});

try {
    const server = expressServer();
    HTTP_SERVER = server;
    server.listen(PORT, HOST, () => {
        const serverAddress = server.address() as AddressInfo;
        // eslint-disable-next-line no-console
        console.log(`Server (${APP.get('env') as string}) start listening on: ${serverAddress.address}:${serverAddress.port}`);
    });
} catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    // eslint-disable-next-line no-console
    console.log('Server crashed');
    exit(ExitCode.CRASH);
}
