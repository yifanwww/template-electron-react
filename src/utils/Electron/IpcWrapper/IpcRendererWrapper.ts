import { IpcRendererEvent } from 'electron';

export class IpcRendererWrapper {
    private ipc?: Electron.IpcRenderer;

    public constructor() {
        try {
            const { ipcRenderer } = window.require('electron');
            this.ipc = ipcRenderer;
        } catch (error) {
            console.error(error.message);
        }
    }

    public async Invoke(channel: string, argument?: any): Promise<any> {
        return this.ipc?.invoke(channel, argument);
    }

    public On(channel: string, listener: (event: IpcRendererEvent, argument?: any) => void): this {
        this.ipc?.on(channel, listener);
        return this;
    }

    public Once(
        channel: string,
        listener: (event: IpcRendererEvent, argument?: any) => void
    ): this {
        this.ipc?.once(channel, listener);
        return this;
    }

    public PostMessage(channel: string, message: any, transfer?: MessagePort[]): void {
        this.ipc?.postMessage(channel, message, transfer);
    }

    public RemoveAllListeners(channel: string): this {
        this.ipc?.removeAllListeners(channel);
        return this;
    }

    public RemoveListener(
        channel: string,
        listener: (event: IpcRendererEvent, argument?: any) => void
    ): this {
        this.ipc?.removeListener(channel, listener);
        return this;
    }

    public Send(channel: string, argument?: any): void {
        this.ipc?.send(channel, argument);
    }

    public SendSync(channel: string, argument?: any): any {
        return this.ipc?.sendSync(channel, argument);
    }

    public SendTo(webContentsId: number, channel: string, argument?: any): void {
        this.ipc?.sendTo(webContentsId, channel, argument);
    }

    public SendToHost(channel: string, argument?: any): void {
        this.ipc?.sendToHost(channel, argument);
    }
}
