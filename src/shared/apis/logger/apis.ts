import type { IpcRendererInvokerAPI } from '../types/index.js';

export const LoggerIpcKey = {
  ERROR: 'Logger:Error',
  WARN: 'Logger:Warn',
  INFO: 'Logger:Info',
  DEBUG: 'Logger:Debug',
};

type LeveledLogAPI = IpcRendererInvokerAPI<(message: string, context?: object) => void>;

export interface LoggerMainAPI {
  handleError: LeveledLogAPI['main'];
  handleWarn: LeveledLogAPI['main'];
  handleInfo: LeveledLogAPI['main'];
  handleDebug: LeveledLogAPI['main'];
}

export interface LoggerRendererAPI {
  error: LeveledLogAPI['renderer'];
  warn: LeveledLogAPI['renderer'];
  info: LeveledLogAPI['renderer'];
  debug: LeveledLogAPI['renderer'];
}
