import { AppAPIChannel, type AppMainAPI } from '@tecra/app-common';
import { ipcMain } from 'electron';

import { windowManager } from 'src/main/window';

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
