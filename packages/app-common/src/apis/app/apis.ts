import type { IpcRendererInvokerAPI } from '../types';

import type { AppDetails, WindowType } from './types';

export const AppAPIKey = {
    CREATE_WINDOW: 'App:CreateWindow',
    GET_APP_DETAILS: 'App:GetAppDetails',
};

type CreateWindowAPI = IpcRendererInvokerAPI<(type: WindowType) => void>;
type GetAppDetails = IpcRendererInvokerAPI<() => AppDetails>;

export interface AppMainAPI {
    handleCreateWindow: CreateWindowAPI['main'];
    handleGetAppDetails: GetAppDetails['main'];
}

export interface AppRendererAPI {
    /**
     * The type of current window.
     */
    windowType: WindowType;
    /**
     * Create a new window.
     */
    createWindow: CreateWindowAPI['renderer'];
    /**
     * Get app details, including app name and app version.
     */
    getAppDetails: GetAppDetails['renderer'];
}
