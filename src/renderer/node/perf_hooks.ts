// Type definitions from @types/node@12.19.9, used for Nodejs v12
/* eslint-disable import/newline-after-import */

import perf_hooks, {
    EventLoopDelayMonitor,
    EventLoopMonitorOptions,
    EventLoopUtilization,
    Performance,
    PerformanceEntry,
    PerformanceNodeTiming,
    PerformanceObserverEntryList,
} from 'perf_hooks';
export type {
    EventLoopDelayMonitor,
    EventLoopMonitorOptions,
    EventLoopUtilization,
    Performance,
    PerformanceEntry,
    PerformanceNodeTiming,
    PerformanceObserverEntryList,
};

const _ = window.require('perf_hooks') as typeof perf_hooks;
export default _;

const { PerformanceObserver, constants } = _;
export { PerformanceObserver, constants };
