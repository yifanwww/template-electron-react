import { IpcRendererEvent } from 'electron';

export class IpcRendererWrapper {
    // eslint-disable-next-line no-undef
    private ipc?: Electron.IpcRenderer;

    public constructor() {
        try {
            const { ipcRenderer } = window.require('electron');
            this.ipc = ipcRenderer;
        } catch (error) {
            console.error(error.message);
        }
    }

    public async invoke(channel: string, argument?: any): Promise<any> {
        return this.ipc?.invoke(channel, argument);
    }

    public on(channel: string, listener: (event: IpcRendererEvent, argument?: any) => void): this {
        this.ipc?.on(channel, listener);
        return this;
    }

    public once(
        channel: string,
        listener: (event: IpcRendererEvent, argument?: any) => void
    ): this {
        this.ipc?.once(channel, listener);
        return this;
    }

    public postMessage(channel: string, message: any, transfer?: MessagePort[]): void {
        this.ipc?.postMessage(channel, message, transfer);
    }

    public removeAllListeners(channel: string): this {
        this.ipc?.removeAllListeners(channel);
        return this;
    }

    public removeListener(
        channel: string,
        listener: (event: IpcRendererEvent, argument?: any) => void
    ): this {
        this.ipc?.removeListener(channel, listener);
        return this;
    }

    public send(channel: string, argument?: any): void {
        this.ipc?.send(channel, argument);
    }

    public sendSync(channel: string, argument?: any): any {
        return this.ipc?.sendSync(channel, argument);
    }

    public sendTo(webContentsId: number, channel: string, argument?: any): void {
        this.ipc?.sendTo(webContentsId, channel, argument);
    }

    public sendToHost(channel: string, argument?: any): void {
        this.ipc?.sendToHost(channel, argument);
    }
}
