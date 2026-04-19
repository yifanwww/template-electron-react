import { ipcMain } from 'electron';
import type { AppMainAPI } from '@shared/apis/app';
import { AppAPIKey } from '@shared/apis/app';
import { makeFn } from '@shared/utils';
import { getAppDetails } from '../app';

export function registerAppGlobalHandlers() {
    ipcMain.handle(
        AppAPIKey.GET_APP_DETAILS,
        makeFn<AppMainAPI['handleGetAppDetails']>(() => ({
            status: 'success',
            data: getAppDetails(),
        })),
    );
}
