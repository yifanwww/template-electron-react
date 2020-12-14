// Type definitions from @types/node@12.19.9, used for Nodejs v12
/* eslint-disable import/newline-after-import */

import readline, {
    AsyncCompleter,
    Completer,
    CompleterResult,
    Direction,
    Key,
    ReadLine,
    ReadLineOptions,
} from 'readline';
export type {
    AsyncCompleter,
    Completer,
    CompleterResult,
    Direction,
    Key,
    ReadLine,
    ReadLineOptions,
};

const _ = window.require('readline') as typeof readline;
export default _;

const { Interface } = _;
export { Interface };
