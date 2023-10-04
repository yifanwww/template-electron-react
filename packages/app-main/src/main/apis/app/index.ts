import type { AppMainAPI } from '@ter/app-common/apis/app';
import { AppAPIKey } from '@ter/app-common/apis/app';
import { ipcMain } from 'electron';

import { getAppDetails } from 'src/main/app';
import { WindowManager } from 'src/main/window';

import { makeHandler } from '../utils';

export function registerAppGlobalHandlers() {
    ipcMain.handle(
        AppAPIKey.CREATE_WINDOW,
        makeHandler<AppMainAPI['handleCreateWindow']>((_, type) => WindowManager.INSTANCE.createWindow({ type })),
    );

    ipcMain.handle(AppAPIKey.GET_APP_DETAILS, makeHandler<AppMainAPI['handleGetAppDetails']>(getAppDetails));
}
