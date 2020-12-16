// Type definitions from @types/node@12.19.9, used for Nodejs v12
/* eslint-disable import/newline-after-import */
/* eslint-disable @typescript-eslint/naming-convention */

import util, { CustomPromisify, EncodeIntoResult, InspectOptions } from 'util';
export type { CustomPromisify, EncodeIntoResult, InspectOptions };

const _ = window.require('util') as typeof util;
export default _;

const { TextDecoder, TextEncoder } = _;
export { TextDecoder, TextEncoder };
