import { contextBridge, ipcRenderer } from 'electron';
import type { AppRendererAPI } from '@shared/apis/app';
import { AppIpcKey } from '@shared/apis/app';
import type { LoggerRendererAPI } from '@shared/apis/logger';
import { LoggerIpcKey } from '@shared/apis/logger';
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

const LoggerAPI: LoggerRendererAPI = {
  debug: forward(LoggerIpcKey.DEBUG),
  error: forward(LoggerIpcKey.ERROR),
  info: forward(LoggerIpcKey.INFO),
  warn: forward(LoggerIpcKey.WARN),
};

contextBridge.exposeInMainWorld('__API_APP', AppAPI);
contextBridge.exposeInMainWorld('__API_LOGGER', LoggerAPI);
