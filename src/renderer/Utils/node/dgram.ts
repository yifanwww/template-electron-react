// Type definitions from @types/node@12.19.9, used for Nodejs v12
/* eslint-disable import/newline-after-import */

import dgram, { BindOptions, RemoteInfo, SocketOptions } from 'dgram';
export type { BindOptions, RemoteInfo, SocketOptions };

const _ = window.require('dgram') as typeof dgram;
export default _;

const { Socket, createSocket } = _;
export { Socket, createSocket };
