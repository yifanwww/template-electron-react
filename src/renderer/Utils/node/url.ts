// Type definitions from @types/node@12.19.9, used for Nodejs v12
/* eslint-disable import/newline-after-import */
/* eslint-disable @typescript-eslint/naming-convention */

import url, { URLFormatOptions, Url, UrlObject, UrlWithParsedQuery, UrlWithStringQuery } from 'url';
export type { URLFormatOptions, Url, UrlObject, UrlWithParsedQuery, UrlWithStringQuery };

const _ = window.require('url') as typeof url;
export default _;

const { URL, URLSearchParams } = _;
export { URL, URLSearchParams };
