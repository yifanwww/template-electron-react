// Type definitions from @types/node@12.19.9, used for Nodejs v12
/* eslint-disable import/newline-after-import */
/* eslint-disable @typescript-eslint/naming-convention */

import async_hooks, { AsyncHook, AsyncResourceOptions, HookCallbacks } from 'async_hooks';
export type { AsyncHook, AsyncResourceOptions, HookCallbacks };

const _ = window.require('async_hooks') as typeof async_hooks;
export default _;

const { AsyncLocalStorage, AsyncResource } = _;
export { AsyncLocalStorage, AsyncResource };
