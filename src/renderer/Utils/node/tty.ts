// Type definitions from @types/node@12.19.9, used for Nodejs v12
/* eslint-disable import/newline-after-import */
/* eslint-disable @typescript-eslint/naming-convention */

import tty, { Direction } from 'tty';
export type { Direction };

const _ = window.require('tty') as typeof tty;
export default _;

const { ReadStream, WriteStream } = _;
export { ReadStream, WriteStream };
