import { ipcMain } from 'electron';
import type { AppMainAPI } from '@shared/app/apis';
import { AppIpcKey } from '@shared/app/apis';
import { makeFn } from '@shared/utils';
import { getAppDetails } from '../app';

export function registerAppGlobalHandlers() {
  ipcMain.handle(
    AppIpcKey.GET_APP_DETAILS,
    makeFn<AppMainAPI['handleGetAppDetails']>(() => ({
      status: 'success',
      data: getAppDetails(),
    })),
  );
}
