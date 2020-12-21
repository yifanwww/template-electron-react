import { ipcMain as ipc } from 'electron';

import { IpcMListener } from '#shared/IpcWrapper.types';
import { WindowType } from '#shared/WindowType';

export class BaseIpcMain {
    public readonly newWindowToOpen = 'NewWindowToOpen';
    public readonly windowType = 'WindowType';

    public onWindowTypeToGet(handler: IpcMListener): void {
        ipc.on(this.windowType, handler);
    }

    public removeWindowTypeToGet(handler: IpcMListener): void {
        ipc.removeListener(this.windowType, handler);
    }

    public onNewWindowToOpen(handler: IpcMListener<WindowType>): void {
        ipc.on(this.newWindowToOpen, handler);
    }

    public removeNewWindowToOpen(handler: IpcMListener<WindowType>): void {
        ipc.removeListener(this.newWindowToOpen, handler);
    }
}

export const baseIpcMain = new BaseIpcMain();
