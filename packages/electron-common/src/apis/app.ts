import type { WindowType } from '../type';

import type { IpcRendererInvokerAPI } from './types';

export interface AppDetails {
    name: string;
    version: string;
    release?: {
        commit: string;
        date: string;
    };
    module: {
        chrome: string;
        electron: string;
        node: string;
        v8: string;
    };
}

export enum AppAPIChannel {
    CREATE_WINDOW = 'App_CreateWindow',
    GET_APP_DETAILS = 'App_GetAppDetails',
    GET_WINDOW_TYPE = 'App_GetWindowType',
}

type CreateWindowAPI = IpcRendererInvokerAPI<void, [windowType: WindowType]>;
type GetAppDetails = IpcRendererInvokerAPI<AppDetails, []>;
type GetWindowType = IpcRendererInvokerAPI<WindowType, []>;

export interface AppMainAPI {
    handleCreateWindow: CreateWindowAPI['main'];
    handleGetAppDetails: GetAppDetails['main'];
    handleGetWindowType: GetWindowType['main'];
}

export interface AppRendererAPI {
    createWindow: CreateWindowAPI['renderer'];
    getAppDetails: GetAppDetails['renderer'];
    getWindowType: GetWindowType['renderer'];
}
