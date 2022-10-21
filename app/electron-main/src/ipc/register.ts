import { IpcServer } from '@tecra-pkg/electron-common';

import { getAppDetails } from 'src/utils';
import { windowManager } from 'src/window';

export function registerIpcGlobalListeners(): void {
    IpcServer.handleCreateWindow((_, windowType) => windowManager.createWindow({ windowType }));
    IpcServer.handleGetAppDetails(getAppDetails);
}
