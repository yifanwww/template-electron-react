import type { LoggerRendererAPI } from '@ter/app-common/apis/logger';
import { LoggerAPIKey } from '@ter/app-common/apis/logger';
import { ipcRenderer } from 'electron';

export const LoggerAPI: LoggerRendererAPI = {
    debug: (...args) => ipcRenderer.invoke(LoggerAPIKey.DEBUG, ...args),
    error: (...args) => ipcRenderer.invoke(LoggerAPIKey.ERROR, ...args),
    info: (...args) => ipcRenderer.invoke(LoggerAPIKey.INFO, ...args),
    log: (...args) => ipcRenderer.invoke(LoggerAPIKey.LOG, ...args),
    verbose: (...args) => ipcRenderer.invoke(LoggerAPIKey.VERBOSE, ...args),
    warn: (...args) => ipcRenderer.invoke(LoggerAPIKey.WARN, ...args),
};
