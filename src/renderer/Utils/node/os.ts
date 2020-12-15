// Type definitions from @types/node@12.19.9, used for Nodejs v12
/* eslint-disable import/newline-after-import */

import os, {
    CpuInfo,
    NetworkInterfaceBase,
    NetworkInterfaceInfo,
    NetworkInterfaceInfoIPv4,
    NetworkInterfaceInfoIPv6,
    UserInfo,
} from 'os';
export type {
    CpuInfo,
    NetworkInterfaceBase,
    NetworkInterfaceInfo,
    NetworkInterfaceInfoIPv4,
    NetworkInterfaceInfoIPv6,
    UserInfo,
};

const _ = window.require('os') as typeof os;
export default _;
