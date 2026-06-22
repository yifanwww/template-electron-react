import { contextBridge, ipcRenderer } from 'electron';
import type { AppRendererAPI } from '@shared/apis/app';
import { AppIpcKey } from '@shared/apis/app';
import type { LoggerRendererAPI } from '@shared/apis/logger';
import { LoggerIpcKey } from '@shared/apis/logger';
import { webArgs } from './args';

const AppAPI: AppRendererAPI = {
  windowType: webArgs.windowType,
  getAppDetails: (...args) => ipcRenderer.invoke(AppIpcKey.GET_APP_DETAILS, ...args),
};

const LoggerAPI: LoggerRendererAPI = {
  debug: (...args) => ipcRenderer.invoke(LoggerIpcKey.DEBUG, ...args),
  error: (...args) => ipcRenderer.invoke(LoggerIpcKey.ERROR, ...args),
  info: (...args) => ipcRenderer.invoke(LoggerIpcKey.INFO, ...args),
  log: (...args) => ipcRenderer.invoke(LoggerIpcKey.LOG, ...args),
  verbose: (...args) => ipcRenderer.invoke(LoggerIpcKey.VERBOSE, ...args),
  warn: (...args) => ipcRenderer.invoke(LoggerIpcKey.WARN, ...args),
};

contextBridge.exposeInMainWorld('__API_APP', AppAPI);
contextBridge.exposeInMainWorld('__API_LOGGER', LoggerAPI);
