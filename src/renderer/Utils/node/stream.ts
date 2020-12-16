// Type definitions from @types/node@12.19.9, used for Nodejs v12
/* eslint-disable import/newline-after-import */
/* eslint-disable @typescript-eslint/naming-convention */

import stream, {
    DuplexOptions,
    FinishedOptions,
    Pipe,
    ReadableOptions,
    TransformCallback,
    TransformOptions,
    WritableOptions,
} from 'stream';
export type {
    DuplexOptions,
    FinishedOptions,
    Pipe,
    ReadableOptions,
    TransformCallback,
    TransformOptions,
    WritableOptions,
};

const _ = window.require('stream') as typeof stream;
export default _;

const { Duplex, EventEmitter, PassThrough, Readable, Stream, Transform, Writable } = _;
export { Duplex, EventEmitter, PassThrough, Readable, Stream, Transform, Writable };
