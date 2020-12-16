// Type definitions from @types/node@12.19.9, used for Nodejs v12
/* eslint-disable import/newline-after-import */
/* eslint-disable @typescript-eslint/naming-convention */

import assert, { AssertPredicate, CallTrackerReportInformation } from 'assert';
export type { AssertPredicate, CallTrackerReportInformation };

const _ = window.require('assert') as typeof assert;
const { AssertionError, CallTracker, strict } = _;

export default _;
export { AssertionError, CallTracker, strict };
