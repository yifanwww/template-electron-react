import type { IpcRendererInvokerAPI } from '../api-types.js';

export const LoggingIpcKey = {
  ERROR: 'logging:error',
  WARN: 'logging:warn',
  INFO: 'logging:info',
  DEBUG: 'logging:debug',
};

type LoggingAPI = IpcRendererInvokerAPI<(message: string, context?: object) => void>;

export interface LoggingMainAPI {
  handleError: LoggingAPI['main'];
  handleWarn: LoggingAPI['main'];
  handleInfo: LoggingAPI['main'];
  handleDebug: LoggingAPI['main'];
}

export interface LoggingRendererAPI {
  error: LoggingAPI['renderer'];
  warn: LoggingAPI['renderer'];
  info: LoggingAPI['renderer'];
  debug: LoggingAPI['renderer'];
}
