import { IpcMainWrapper } from './IpcMainWrapper';

export class BaseCustomIpcMain {
    protected readonly _ipc: IpcMainWrapper;

    public constructor() {
        this._ipc = new IpcMainWrapper();
    }
}

export const BaseIpcMain = new BaseCustomIpcMain();
