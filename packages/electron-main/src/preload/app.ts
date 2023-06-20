import { AppAPIChannel } from '@tecra/electron-common';
import type { AppRendererAPI } from '@tecra/electron-common';
import { ipcRenderer } from 'electron';

export const appAPI: AppRendererAPI = {
    createWindow: (windowType) => ipcRenderer.invoke(AppAPIChannel.CREATE_WINDOW, windowType),

    getAppDetails: () => ipcRenderer.invoke(AppAPIChannel.GET_APP_DETAILS),

    getWindowType: () => ipcRenderer.invoke(AppAPIChannel.GET_WINDOW_TYPE),
};
