// Type definitions from @types/node@12.19.9, used for Nodejs v12
/* eslint-disable import/newline-after-import */
/* eslint-disable @typescript-eslint/naming-convention */

import dns, {
    AnyARecord,
    AnyAaaaRecord,
    AnyCnameRecord,
    AnyMxRecord,
    AnyNaptrRecord,
    AnyNsRecord,
    AnyPtrRecord,
    AnyRecord,
    AnySoaRecord,
    AnySrvRecord,
    AnyTxtRecord,
    LookupAddress,
    LookupAllOptions,
    LookupOneOptions,
    LookupOptions,
    MxRecord,
    NaptrRecord,
    RecordWithTtl,
    ResolveOptions,
    ResolveWithTtlOptions,
    SoaRecord,
    SrvRecord,
} from 'dns';
export type {
    AnyARecord,
    AnyAaaaRecord,
    AnyCnameRecord,
    AnyMxRecord,
    AnyNaptrRecord,
    AnyNsRecord,
    AnyPtrRecord,
    AnyRecord,
    AnySoaRecord,
    AnySrvRecord,
    AnyTxtRecord,
    LookupAddress,
    LookupAllOptions,
    LookupOneOptions,
    LookupOptions,
    MxRecord,
    NaptrRecord,
    RecordWithTtl,
    ResolveOptions,
    ResolveWithTtlOptions,
    SoaRecord,
    SrvRecord,
};

const _ = window.require('dns') as typeof dns;
export default _;

const { Resolver, promises } = _;
export { Resolver, promises };
