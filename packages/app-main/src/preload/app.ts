import type { AppRendererAPI } from '@ter/app-common/apis/app';
import { AppAPIChannel } from '@ter/app-common/apis/app';
import { ipcRenderer } from 'electron';

import { webArgs } from './args';

export const AppAPI: AppRendererAPI = {
    windowType: webArgs.windowType,
    createWindow: (...args) => ipcRenderer.invoke(AppAPIChannel.CREATE_WINDOW, ...args),
    getAppDetails: (...args) => ipcRenderer.invoke(AppAPIChannel.GET_APP_DETAILS, ...args),
};
