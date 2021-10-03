import { IpcServer } from '@tecra/electron-common';

import { getAppDetails } from 'src/utils';
import { windowManager } from 'src/window';

export function registerIpcGlobalListeners(): void {
    IpcServer.handleCreateWindow((_, windowType) => windowManager.createWindow({ windowType }));
    IpcServer.handleGetAppDetails(getAppDetails);
}
