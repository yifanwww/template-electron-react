import { contextBridge, ipcRenderer } from 'electron';
import type { AppRendererAPI } from '@shared/app/apis';
import { AppIpcKey } from '@shared/app/apis';
import type { LoggingRendererAPI } from '@shared/logging/apis';
import { LoggingIpcKey } from '@shared/logging/apis';
import type { UnknownFn } from '@shared/types';
import { webArgs } from './args';

/**
 * Keep ordinary bridge methods as exact argument forwarders. This avoids a method silently
 * discarding a newly added request parameter when a cross-process contract evolves.
 */
function forward<T extends UnknownFn>(channel: string): T {
  return ((...args: Parameters<T>) => ipcRenderer.invoke(channel, ...args)) as T;
}

const AppAPI: AppRendererAPI = {
  windowType: webArgs.windowType,
  getAppDetails: forward(AppIpcKey.GET_APP_DETAILS),
};

const LoggingAPI: LoggingRendererAPI = {
  debug: forward(LoggingIpcKey.DEBUG),
  error: forward(LoggingIpcKey.ERROR),
  info: forward(LoggingIpcKey.INFO),
  warn: forward(LoggingIpcKey.WARN),
};

contextBridge.exposeInMainWorld('__API_APP', AppAPI);
contextBridge.exposeInMainWorld('__API_LOGGING', LoggingAPI);
