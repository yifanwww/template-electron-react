// Type definitions from @types/node@12.19.9, used for Nodejs v12
/* eslint-disable import/newline-after-import */
/* eslint-disable @typescript-eslint/naming-convention */

import https, { AgentOptions, RequestOptions, ServerOptions } from 'https';
export type { AgentOptions, RequestOptions, ServerOptions };

const _ = window.require('https') as typeof https;
export default _;

const { Agent, Server } = _;
export { Agent, Server };
