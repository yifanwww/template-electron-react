import { IpcMainEvent, IpcMainInvokeEvent } from 'electron';

export type IpcMainFunc<Argument = undefined> = Argument extends undefined
    ? (event: IpcMainEvent) => void
    : (event: IpcMainEvent, argument: Argument) => void;

export type IpcMainInvokeFunc<Argument = undefined> = Argument extends undefined
    ? (event: IpcMainInvokeEvent) => void
    : (event: IpcMainInvokeEvent, argument: Argument) => void;

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
        listener: (event: IpcMainInvokeEvent, argument: any) => Promise<void> | any
    ): void {
        this._ipc?.handle(channel, listener);
    }

    public HandleOnce(
        channel: string,
        listener: (event: IpcMainInvokeEvent, argument: any) => Promise<void> | any
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
