import type { IpcRendererInvokerAPI } from '../types';

export enum LoggerAPIChannel {
    LOG = 'Logger_Log',
    ERROR = 'Logger_Error',
    WARN = 'Logger_Warn',
    INFO = 'Logger_Info',
    VERBOSE = 'Logger_Verbose',
    DEBUG = 'Logger_Debug',
}

type LogLevel = 'error' | 'warn' | 'info' | 'verbose' | 'debug';

type LogAPI = IpcRendererInvokerAPI<(level: LogLevel, message: string, ...meta: unknown[]) => void>;

type LeveledLogAPI = IpcRendererInvokerAPI<(message: string, ...meta: unknown[]) => void>;

export interface LoggerMainAPI {
    handleLog: LogAPI['main'];
    handleError: LeveledLogAPI['main'];
    handleWarn: LeveledLogAPI['main'];
    handleInfo: LeveledLogAPI['main'];
    handleVerbose: LeveledLogAPI['main'];
    handleDebug: LeveledLogAPI['main'];
}

export interface LoggerRendererAPI {
    log: LogAPI['renderer'];
    error: LeveledLogAPI['renderer'];
    warn: LeveledLogAPI['renderer'];
    info: LeveledLogAPI['renderer'];
    verbose: LeveledLogAPI['renderer'];
    debug: LeveledLogAPI['renderer'];
}
