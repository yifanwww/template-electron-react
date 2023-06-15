import type { AppDetails, WindowType } from '../type';

import type { IpcMainHandler, IpcRendererInvoker } from './types';

export enum AppAPIChannel {
    CREATE_WINDOW = 'CreateWindow',
    GET_APP_DETAILS = 'GetAppDetails',
    GET_WINDOW_TYPE = 'GetWindowType',
}

interface CreateWindowAPI {
    main: IpcMainHandler<void, [windowType: WindowType]>;
    renderer: IpcRendererInvoker<Promise<void>, [windowType: WindowType]>;
}

interface GetAppDetails {
    main: IpcMainHandler<AppDetails, []>;
    renderer: IpcRendererInvoker<Promise<AppDetails>, []>;
}

interface GetWindowType {
    main: IpcMainHandler<WindowType, []>;
    renderer: IpcRendererInvoker<Promise<WindowType>, []>;
}

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
