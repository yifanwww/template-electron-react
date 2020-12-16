// Type definitions from @types/node@12.19.9, used for Nodejs v12
/* eslint-disable import/newline-after-import */
/* eslint-disable @typescript-eslint/naming-convention */

import fs, {
    BigIntOptions,
    FSWatcher,
    MakeDirectoryOptions,
    NoParamCallback,
    OpenDirOptions,
    PathLike,
    RmDirOptions,
    StatOptions,
    StatsBase,
    WriteFileOptions,
    WriteVResult,
} from 'fs';
export type {
    BigIntOptions,
    FSWatcher,
    MakeDirectoryOptions,
    NoParamCallback,
    OpenDirOptions,
    PathLike,
    RmDirOptions,
    StatOptions,
    StatsBase,
    WriteFileOptions,
    WriteVResult,
};

const _ = window.require('fs') as typeof fs;
export default _;

const { BigIntStats, constants, Dir, Dirent, promises, ReadStream, Stats, WriteStream } = _;
export { BigIntStats, constants, Dir, Dirent, promises, ReadStream, Stats, WriteStream };
