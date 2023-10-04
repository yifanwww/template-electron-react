import type { AppRendererAPI } from '@ter/app-common/apis/app';
import { AppAPIKey } from '@ter/app-common/apis/app';
import { ipcRenderer } from 'electron';

import { webArgs } from './args';

export const AppAPI: AppRendererAPI = {
    windowType: webArgs.windowType,
    createWindow: (...args) => ipcRenderer.invoke(AppAPIKey.CREATE_WINDOW, ...args),
    getAppDetails: (...args) => ipcRenderer.invoke(AppAPIKey.GET_APP_DETAILS, ...args),
};
