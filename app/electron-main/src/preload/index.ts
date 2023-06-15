import { contextBridge } from 'electron';

import { appAPI } from './appAPI';

contextBridge.exposeInMainWorld('appAPI', appAPI);
