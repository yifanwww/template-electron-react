// Type definitions from @types/node@12.19.9, used for Nodejs v12
/* eslint-disable import/newline-after-import */
/* eslint-disable @typescript-eslint/naming-convention */

import net, {
    AddressInfo,
    ConnectOpts,
    IpcNetConnectOpts,
    IpcSocketConnectOpts,
    ListenOptions,
    LookupFunction,
    NetConnectOpts,
    OnReadOpts,
    SocketConstructorOpts,
    TcpNetConnectOpts,
    TcpSocketConnectOpts,
} from 'net';
export type {
    AddressInfo,
    ConnectOpts,
    IpcNetConnectOpts,
    IpcSocketConnectOpts,
    ListenOptions,
    LookupFunction,
    NetConnectOpts,
    OnReadOpts,
    SocketConstructorOpts,
    TcpNetConnectOpts,
    TcpSocketConnectOpts,
};

const _ = window.require('net') as typeof net;
export default _;

const { Server, Socket } = _;
export { Server, Socket };
