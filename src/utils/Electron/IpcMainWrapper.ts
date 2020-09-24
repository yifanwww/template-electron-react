import { IpcMainEvent, IpcMainInvokeEvent } from 'electron';

export class IpcMainWrapper {
    private _ipc?: Electron.IpcMain;

    public constructor() {
        try {
            let { ipcMain } = require('electron');
            this._ipc = ipcMain;
        } catch (error) {
            console.error(error.message);
        }
    }

    public Handle(
        channel: string,
        listener: (event: IpcMainInvokeEvent, argument: any) => any
    ): void {
        this._ipc?.handle(channel, listener);
    }

    public HandleOnce(
        channel: string,
        listener: (event: IpcMainInvokeEvent, argument: any) => any
    ): void {
        this._ipc?.handleOnce(channel, listener);
    }

    public On(channel: string, listener: (event: IpcMainEvent, argument?: any) => void): this {
        this._ipc?.on(channel, listener);
        return this;
    }

    public Once(channel: string, listener: (event: IpcMainEvent, argument?: any) => void): this {
        this._ipc?.once(channel, listener);
        return this;
    }

    public RemoveAllListeners(channel: string): this {
        this._ipc?.removeAllListeners(channel);
        return this;
    }

    public RemoveHandler(channel: string): void {
        this._ipc?.removeHandler(channel);
    }

    public RemoveListener(
        channel: string,
        listener: (event: IpcMainEvent, argument?: any) => void
    ): this {
        this._ipc?.removeListener(channel, listener);
        return this;
    }
}
