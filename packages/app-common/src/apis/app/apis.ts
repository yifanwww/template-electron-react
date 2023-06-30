import type { IpcRendererInvokerAPI } from '../types';

import type { AppDetails, WindowType } from './types';

export enum AppAPIChannel {
    CREATE_WINDOW = 'App_CreateWindow',
    GET_APP_DETAILS = 'App_GetAppDetails',
    GET_WINDOW_TYPE = 'App_GetWindowType',
}

type CreateWindowAPI = IpcRendererInvokerAPI<void, [windowType: WindowType]>;
type GetWindowType = IpcRendererInvokerAPI<WindowType, []>;

type GetAppDetails = IpcRendererInvokerAPI<AppDetails, []>;

export interface AppMainAPI {
    handleCreateWindow: CreateWindowAPI['main'];
    handleGetWindowType: GetWindowType['main'];
    handleGetAppDetails: GetAppDetails['main'];
}

export interface AppRendererAPI {
    /**
     * Create a new window.
     */
    createWindow: CreateWindowAPI['renderer'];
    /**
     * Get the type of current window.
     */
    getWindowType: GetWindowType['renderer'];
    /**
     * Get app details, including app name and app version.
     */
    getAppDetails: GetAppDetails['renderer'];
}
