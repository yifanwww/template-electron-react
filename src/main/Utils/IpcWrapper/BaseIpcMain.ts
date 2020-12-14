import { IpcMListener } from '#shared/IpcWrapper.types';
import { WindowType } from '#shared/WindowType';

import { IpcMainWrapper } from './IpcMainWrapper';

export class BaseIpcMain {
    protected readonly ipc = new IpcMainWrapper();

    public readonly clientAreaInitialized = 'ClientAreaInitialized';
    public readonly newWindowToOpen = 'NewWindowToOpen';
    public readonly windowResized = 'WindowResized';
    public readonly windowType = 'WindowType';

    public onClientAreaInitialized(handler: IpcMListener): void {
        this.ipc.on(this.clientAreaInitialized, handler);
    }

    public removeClientAreaInitialized(handler: IpcMListener): void {
        this.ipc.removeListener(this.clientAreaInitialized, handler);
    }

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
