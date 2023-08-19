import { contextBridge } from 'electron';

import { appAPI } from './app';
import { loggerAPI } from './logger';

contextBridge.exposeInMainWorld('appAPI', appAPI);
contextBridge.exposeInMainWorld('loggerAPI', loggerAPI);
