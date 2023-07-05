import type { IpcRendererInvokerAPI } from '../types';

import type { AppDetails, WindowType } from './types';

export enum AppAPIChannel {
    CREATE_WINDOW = 'App_CreateWindow',
    GET_APP_DETAILS = 'App_GetAppDetails',
}

type CreateWindowAPI = IpcRendererInvokerAPI<(windowType: WindowType) => void>;
type GetAppDetails = IpcRendererInvokerAPI<() => AppDetails>;

export interface AppMainAPI {
    handleCreateWindow: CreateWindowAPI['main'];
    handleGetAppDetails: GetAppDetails['main'];
}

export interface AppRendererAPI {
    /**
     * The type of current window.
     */
    get windowType(): WindowType;
    /**
     * Create a new window.
     */
    createWindow: CreateWindowAPI['renderer'];
    /**
     * Get app details, including app name and app version.
     */
    getAppDetails: GetAppDetails['renderer'];
}