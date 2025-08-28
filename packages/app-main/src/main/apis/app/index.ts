import type { AppMainAPI } from '@ter/app-common/apis/app';
import { AppAPIKey } from '@ter/app-common/apis/app';
import { makeFn } from '@ter/app-common/utils';
import { ipcMain } from 'electron';

import { getAppDetails } from 'src/main/app';

export function registerAppGlobalHandlers() {
    ipcMain.handle(AppAPIKey.GET_APP_DETAILS, makeFn<AppMainAPI['handleGetAppDetails']>(getAppDetails));
}
