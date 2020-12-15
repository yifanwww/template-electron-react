// Type definitions from @types/node@12.19.9, used for Nodejs v12
/* eslint-disable import/newline-after-import */

import http, {
    AgentOptions,
    ClientRequestArgs,
    IncomingHttpHeaders,
    InformationEvent,
    OutgoingHttpHeaders,
    RequestListener,
    RequestOptions,
    ServerOptions,
} from 'http';
export type {
    AgentOptions,
    ClientRequestArgs,
    IncomingHttpHeaders,
    InformationEvent,
    OutgoingHttpHeaders,
    RequestListener,
    RequestOptions,
    ServerOptions,
};

const _ = window.require('http') as typeof http;
export default _;

const { Agent, ClientRequest, IncomingMessage, OutgoingMessage, Server, ServerResponse } = _;
export { Agent, ClientRequest, IncomingMessage, OutgoingMessage, Server, ServerResponse };
