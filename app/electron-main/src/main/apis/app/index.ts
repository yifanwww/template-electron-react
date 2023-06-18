import { AppAPIChannel, type AppMainAPI } from '@tecra-pkg/electron-common';
import { ipcMain } from 'electron';

import { windowManager } from 'src/main/window';

import { HandlerRegister } from '../utils';

import { getAppDetails } from './getAppDetails';

function registerCreateWindowHandler() {
    const handler: AppMainAPI['handleCreateWindow'] = (_, windowType) => windowManager.createWindow({ windowType });
    ipcMain.handle(AppAPIChannel.CREATE_WINDOW, handler);
}

function registerGetAppDetailsHandler() {
    const handler: AppMainAPI['handleGetAppDetails'] = getAppDetails;
    ipcMain.handle(AppAPIChannel.GET_APP_DETAILS, handler);
}

export function registerAppGlobalHandlers() {
    registerCreateWindowHandler();
    registerGetAppDetailsHandler();
}

export const appAPIHandlers = {
    getWindowType: new HandlerRegister<AppMainAPI['handleGetWindowType']>(AppAPIChannel.GET_WINDOW_TYPE),
};
