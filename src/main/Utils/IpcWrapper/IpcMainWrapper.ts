import { IpcMainEvent, IpcMainInvokeEvent } from 'electron';

export class IpcMainWrapper {
    private ipc?: Electron.IpcMain;

    public constructor() {
        try {
            // eslint-disable-next-line global-require
            const { ipcMain } = require('electron');
            this.ipc = ipcMain;
        } catch (error) {
            console.error(error.message);
        }
    }

    public handle(
        channel: string,
        listener: (event: IpcMainInvokeEvent, argument: any) => any
    ): void {
        this.ipc?.handle(channel, listener);
    }

    public handleOnce(
        channel: string,
        listener: (event: IpcMainInvokeEvent, argument: any) => any
    ): void {
        this.ipc?.handleOnce(channel, listener);
    }

    public on(channel: string, listener: (event: IpcMainEvent, argument?: any) => void): this {
        this.ipc?.on(channel, listener);
        return this;
    }

    public once(channel: string, listener: (event: IpcMainEvent, argument?: any) => void): this {
        this.ipc?.once(channel, listener);
        return this;
    }

    public removeAllListeners(channel: string): this {
        this.ipc?.removeAllListeners(channel);
        return this;
    }

    public removeHandler(channel: string): void {
        this.ipc?.removeHandler(channel);
    }

    public removeListener(
        channel: string,
        listener: (event: IpcMainEvent, argument?: any) => void
    ): this {
        this.ipc?.removeListener(channel, listener);
        return this;
    }
}
