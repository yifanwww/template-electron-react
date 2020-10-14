import { WindowType } from '@Utils';

import { IpcMainWrapper } from './IpcMainWrapper';
import { IpcMainFunc } from './IpcWrapper.types';

export class BaseIpcMainClass {
    protected readonly ipc = new IpcMainWrapper();

    public ClientAreaInitialized = 'ClientAreaInitialized';
    public NewWindowToOpen = 'NewWindowToOpen';
    public WindowResized = 'WindowResized';
    public WindowType = 'WindowType';

    public OnClientAreaInitialized(func: IpcMainFunc): void {
        this.ipc.On(this.ClientAreaInitialized, func);
    }

    public RemoveClientAreaInitialized(func: IpcMainFunc): void {
        this.ipc.RemoveListener(this.ClientAreaInitialized, func);
    }

    public OnWindowTypeToGet(func: IpcMainFunc): void {
        this.ipc.On(this.WindowType, func);
    }

    public RemoveWindowTypeToGet(func: IpcMainFunc<WindowType>): void {
        this.ipc.RemoveListener(this.WindowType, func);
    }

    public OnNewWindowToOpen(func: IpcMainFunc<WindowType>): void {
        this.ipc.On(this.NewWindowToOpen, func);
    }

    public RemoveNewWindowToOpen(func: IpcMainFunc<WindowType>): void {
        this.ipc.RemoveListener(this.NewWindowToOpen, func);
    }
}

export const BaseIpcMain = new BaseIpcMainClass();
