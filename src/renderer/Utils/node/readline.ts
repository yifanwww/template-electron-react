// Type definitions from @types/node@12.19.9, used for Nodejs v12
/* eslint-disable import/newline-after-import */
/* eslint-disable @typescript-eslint/naming-convention */

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
