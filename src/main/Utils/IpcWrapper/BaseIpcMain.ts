import { IpcMListener } from '#shared/IpcWrapper.types';
import { WindowType } from '#shared/WindowType';

import { IpcMainWrapper } from './IpcMainWrapper';

export class BaseIpcMain {
    protected readonly ipc = new IpcMainWrapper();

    public readonly newWindowToOpen = 'NewWindowToOpen';
    public readonly windowType = 'WindowType';

    public onWindowTypeToGet(handler: IpcMListener): void {
        this.ipc.on(this.windowType, handler);
    }

    public removeWindowTypeToGet(handler: IpcMListener): void {
        this.ipc.removeListener(this.windowType, handler);
    }

    public onNewWindowToOpen(handler: IpcMListener<WindowType>): void {
        this.ipc.on(this.newWindowToOpen, handler);
    }

    public removeNewWindowToOpen(handler: IpcMListener<WindowType>): void {
        this.ipc.removeListener(this.newWindowToOpen, handler);
    }
}

export const baseIpcMain = new BaseIpcMain();
