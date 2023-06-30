import { AppAPIChannel } from '@tecra/app-common';
import type { AppRendererAPI } from '@tecra/app-common';
import { ipcRenderer } from 'electron';

import { webArgs } from './args';

export const appAPI: AppRendererAPI = {
    windowType: webArgs.windowType,
    createWindow: (...args) => ipcRenderer.invoke(AppAPIChannel.CREATE_WINDOW, ...args),
    getAppDetails: (...args) => ipcRenderer.invoke(AppAPIChannel.GET_APP_DETAILS, ...args),
};
