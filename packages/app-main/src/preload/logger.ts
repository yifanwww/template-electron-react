import type { LoggerRendererAPI } from '@ter/app-common/apis/logger';
import { LoggerAPIChannel } from '@ter/app-common/apis/logger';
import { ipcRenderer } from 'electron';

export const loggerAPI: LoggerRendererAPI = {
    debug: (...args) => ipcRenderer.invoke(LoggerAPIChannel.DEBUG, ...args),
    error: (...args) => ipcRenderer.invoke(LoggerAPIChannel.ERROR, ...args),
    info: (...args) => ipcRenderer.invoke(LoggerAPIChannel.INFO, ...args),
    log: (...args) => ipcRenderer.invoke(LoggerAPIChannel.LOG, ...args),
    verbose: (...args) => ipcRenderer.invoke(LoggerAPIChannel.VERBOSE, ...args),
    warn: (...args) => ipcRenderer.invoke(LoggerAPIChannel.WARN, ...args),
};
