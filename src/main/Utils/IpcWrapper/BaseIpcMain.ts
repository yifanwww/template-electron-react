import { IpcMainFunc } from '#shared/IpcWrapper.types';
import { WindowType } from '#shared/WindowType';

import { IpcMainWrapper } from './IpcMainWrapper';

export class BaseIpcMain {
    protected readonly ipc = new IpcMainWrapper();

    public readonly clientAreaInitialized = 'ClientAreaInitialized';
    public readonly newWindowToOpen = 'NewWindowToOpen';
    public readonly windowResized = 'WindowResized';
    public readonly windowType = 'WindowType';

    public onClientAreaInitialized(func: IpcMainFunc): void {
        this.ipc.on(this.clientAreaInitialized, func);
    }

    public removeClientAreaInitialized(func: IpcMainFunc): void {
        this.ipc.removeListener(this.clientAreaInitialized, func);
    }

    public onWindowTypeToGet(func: IpcMainFunc): void {
        this.ipc.on(this.windowType, func);
    }

    public removeWindowTypeToGet(func: IpcMainFunc<WindowType>): void {
        this.ipc.removeListener(this.windowType, func);
    }

    public onNewWindowToOpen(func: IpcMainFunc<WindowType>): void {
        this.ipc.on(this.newWindowToOpen, func);
    }

    public removeNewWindowToOpen(func: IpcMainFunc<WindowType>): void {
        this.ipc.removeListener(this.newWindowToOpen, func);
    }
}

export const baseIpcMain = new BaseIpcMain();
