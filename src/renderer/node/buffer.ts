// Type definitions from @types/node@12.19.9, used for Nodejs v12
/* eslint-disable import/newline-after-import */

import buffer, { TranscodeEncoding } from 'buffer';
export type { TranscodeEncoding };

const _ = window.require('buffer') as typeof buffer;
export default _;

const { Buffer, constants, INSPECT_MAX_BYTES, kMaxLength, kStringMaxLength, SlowBuffer } = _;
export { Buffer, constants, INSPECT_MAX_BYTES, kMaxLength, kStringMaxLength, SlowBuffer };
