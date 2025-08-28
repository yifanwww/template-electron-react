import type { AppRendererAPI } from '@app/common/apis/app';
import { AppAPIKey } from '@app/common/apis/app';
import { ipcRenderer } from 'electron';

import { webArgs } from './args';

export const AppAPI: AppRendererAPI = {
    windowType: webArgs.windowType,
    getAppDetails: (...args) => ipcRenderer.invoke(AppAPIKey.GET_APP_DETAILS, ...args),
};
