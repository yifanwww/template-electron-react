// Type definitions from @types/node@12.19.9, used for Nodejs v12
/* eslint-disable import/newline-after-import */

import querystring, {
    ParseOptions,
    ParsedUrlQuery,
    ParsedUrlQueryInput,
    StringifyOptions,
} from 'querystring';
export type { ParseOptions, ParsedUrlQuery, ParsedUrlQueryInput, StringifyOptions };

const _ = window.require('querystring') as typeof querystring;
export default _;
