import type { IpcRendererInvokerAPI } from '../types.js';

import type { AppDetails, WindowType } from './types.js';

export const AppAPIKey = {
    GET_APP_DETAILS: 'App:GetAppDetails',
};

type GetAppDetails = IpcRendererInvokerAPI<() => AppDetails>;

export interface AppMainAPI {
    handleGetAppDetails: GetAppDetails['main'];
}

export interface AppRendererAPI {
    /**
     * The type of current window.
     */
    windowType: WindowType;
    /**
     * Get app details, including app name and app version.
     */
    getAppDetails: GetAppDetails['renderer'];
}
