import type { AppMainAPI } from '@ter/app-common/apis/app';
import { AppAPIKey } from '@ter/app-common/apis/app';
import { makeFn } from '@ter/app-common/utils';
import { ipcMain } from 'electron';

import { getAppDetails } from 'src/main/app';
import { WindowManager } from 'src/main/window';

export function registerAppGlobalHandlers() {
    ipcMain.handle(
        AppAPIKey.CREATE_WINDOW,
        makeFn<AppMainAPI['handleCreateWindow']>((_, type) => WindowManager.INSTANCE.createWindow({ type })),
    );

    ipcMain.handle(AppAPIKey.GET_APP_DETAILS, makeFn<AppMainAPI['handleGetAppDetails']>(getAppDetails));
}
