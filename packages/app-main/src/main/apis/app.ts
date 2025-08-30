import type { AppMainAPI } from '@app/common/apis/app';
import { AppAPIKey } from '@app/common/apis/app';
import { makeFn } from '@app/common/utils';
import { ipcMain } from 'electron';

import { getAppDetails } from '../app';

export function registerAppGlobalHandlers() {
    ipcMain.handle(AppAPIKey.GET_APP_DETAILS, makeFn<AppMainAPI['handleGetAppDetails']>(getAppDetails));
}
