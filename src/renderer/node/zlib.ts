// Type definitions from @types/node@12.19.9, used for Nodejs v12
/* eslint-disable import/newline-after-import */

import zlib, {
    BrotliCompress,
    BrotliDecompress,
    BrotliOptions,
    CompressCallback,
    Deflate,
    DeflateRaw,
    Gunzip,
    Gzip,
    Inflate,
    InflateRaw,
    InputType,
    Unzip,
    Zlib,
    ZlibOptions,
    ZlibParams,
    ZlibReset,
} from 'zlib';
export type {
    BrotliCompress,
    BrotliDecompress,
    BrotliOptions,
    CompressCallback,
    Deflate,
    DeflateRaw,
    Gunzip,
    Gzip,
    Inflate,
    InflateRaw,
    InputType,
    Unzip,
    Zlib,
    ZlibOptions,
    ZlibParams,
    ZlibReset,
};

const _ = window.require('zlib') as typeof zlib;
export default _;

const { constants } = _;
export { constants };
