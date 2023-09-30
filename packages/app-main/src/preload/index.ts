import { contextBridge } from 'electron';

import { AppAPI } from './app';
import { LoggerAPI } from './logger';

contextBridge.exposeInMainWorld('APP_API', AppAPI);
contextBridge.exposeInMainWorld('LOGGER_API', LoggerAPI);
