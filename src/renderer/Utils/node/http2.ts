// Type definitions from @types/node@12.19.9, used for Nodejs v12
/* eslint-disable import/newline-after-import */

import http2, {
    AlternativeServiceOptions,
    ClientHttp2Session,
    ClientHttp2Stream,
    ClientSessionOptions,
    ClientSessionRequestOptions,
    Http2SecureServer,
    Http2Server,
    Http2Session,
    Http2Stream,
    IncomingHttpHeaders,
    IncomingHttpStatusHeader,
    SecureClientSessionOptions,
    SecureServerOptions,
    SecureServerSessionOptions,
    ServerHttp2Session,
    ServerHttp2Stream,
    ServerOptions,
    ServerSessionOptions,
    ServerStreamFileResponseOptions,
    ServerStreamFileResponseOptionsWithError,
    ServerStreamResponseOptions,
    SessionOptions,
    SessionState,
    Settings,
    StatOptions,
    StreamPriorityOptions,
    StreamState,
    OutgoingHttpHeaders,
} from 'http2';
export type {
    AlternativeServiceOptions,
    ClientHttp2Session,
    ClientHttp2Stream,
    ClientSessionOptions,
    ClientSessionRequestOptions,
    Http2SecureServer,
    Http2Server,
    Http2Session,
    Http2Stream,
    IncomingHttpHeaders,
    IncomingHttpStatusHeader,
    SecureClientSessionOptions,
    SecureServerOptions,
    SecureServerSessionOptions,
    ServerHttp2Session,
    ServerHttp2Stream,
    ServerOptions,
    ServerSessionOptions,
    ServerStreamFileResponseOptions,
    ServerStreamFileResponseOptionsWithError,
    ServerStreamResponseOptions,
    SessionOptions,
    SessionState,
    Settings,
    StatOptions,
    StreamPriorityOptions,
    StreamState,
    OutgoingHttpHeaders,
};

const _ = window.require('http2') as typeof http2;
export default _;

const { constants, Http2ServerRequest, Http2ServerResponse } = _;
export { constants, Http2ServerRequest, Http2ServerResponse };
