import { contextBridge } from 'electron';

import { appAPI } from './app';

contextBridge.exposeInMainWorld('appAPI', appAPI);
