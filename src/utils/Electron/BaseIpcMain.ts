import { IpcMainWrapper } from './IpcMainWrapper';

export class BaseIpcMain {
    protected static readonly _ipc = new IpcMainWrapper();
}
