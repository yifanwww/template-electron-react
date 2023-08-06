import type { AppMainAPI } from '@ter/app-common/apis/app';
import { AppAPIChannel } from '@ter/app-common/apis/app';
import { ipcMain } from 'electron';

import { getAppDetails } from 'src/main/app';
import { windowManager } from 'src/main/window';

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
