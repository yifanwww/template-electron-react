import { ipcMain } from 'electron';

import { IpcMListener } from '#shared/IpcTypes';
import { WindowType } from '#shared/WindowType';

class WindowIpc {
    public readonly newWindowToOpen = 'NewWindowToOpen';
    public readonly windowType = 'WindowType';

    public onWindowTypeToGet(handler: IpcMListener): void {
        ipcMain.on(this.windowType, handler);
    }

    public removeWindowTypeToGet(handler: IpcMListener): void {
        ipcMain.removeListener(this.windowType, handler);
    }

    public onNewWindowToOpen(handler: IpcMListener<WindowType>): void {
        ipcMain.on(this.newWindowToOpen, handler);
    }

    public removeNewWindowToOpen(handler: IpcMListener<WindowType>): void {
        ipcMain.removeListener(this.newWindowToOpen, handler);
    }
}

export const windowIpc = new WindowIpc();
