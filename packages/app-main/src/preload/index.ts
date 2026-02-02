import type { AppRendererAPI } from '@app/common/apis/app';
import { AppAPIKey } from '@app/common/apis/app';
import type { LoggerRendererAPI } from '@app/common/apis/logger';
import { LoggerAPIKey } from '@app/common/apis/logger';
import { contextBridge, ipcRenderer } from 'electron';
import { webArgs } from './args';

const AppAPI: AppRendererAPI = {
    windowType: webArgs.windowType,
    getAppDetails: (...args) => ipcRenderer.invoke(AppAPIKey.GET_APP_DETAILS, ...args),
};

const LoggerAPI: LoggerRendererAPI = {
    debug: (...args) => ipcRenderer.invoke(LoggerAPIKey.DEBUG, ...args),
    error: (...args) => ipcRenderer.invoke(LoggerAPIKey.ERROR, ...args),
    info: (...args) => ipcRenderer.invoke(LoggerAPIKey.INFO, ...args),
    log: (...args) => ipcRenderer.invoke(LoggerAPIKey.LOG, ...args),
    verbose: (...args) => ipcRenderer.invoke(LoggerAPIKey.VERBOSE, ...args),
    warn: (...args) => ipcRenderer.invoke(LoggerAPIKey.WARN, ...args),
};

contextBridge.exposeInMainWorld('__API_APP', AppAPI);
contextBridge.exposeInMainWorld('__API_LOGGER', LoggerAPI);
