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

    public Handle(
        channel: string,
        listener: (event: IpcMainInvokeEvent, argument: any) => any
    ): void {
        this.ipc?.handle(channel, listener);
    }

    public HandleOnce(
        channel: string,
        listener: (event: IpcMainInvokeEvent, argument: any) => any
    ): void {
        this.ipc?.handleOnce(channel, listener);
    }

    public On(channel: string, listener: (event: IpcMainEvent, argument?: any) => void): this {
        this.ipc?.on(channel, listener);
        return this;
    }

    public Once(channel: string, listener: (event: IpcMainEvent, argument?: any) => void): this {
        this.ipc?.once(channel, listener);
        return this;
    }

    public RemoveAllListeners(channel: string): this {
        this.ipc?.removeAllListeners(channel);
        return this;
    }

    public RemoveHandler(channel: string): void {
        this.ipc?.removeHandler(channel);
    }

    public RemoveListener(
        channel: string,
        listener: (event: IpcMainEvent, argument?: any) => void
    ): this {
        this.ipc?.removeListener(channel, listener);
        return this;
    }
}
