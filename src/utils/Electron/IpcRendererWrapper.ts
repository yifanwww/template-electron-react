import { IpcRendererEvent } from 'electron';

export class IpcRendererWrapper {
    private _ipc?: Electron.IpcRenderer;

    public constructor() {
        try {
            let { ipcRenderer } = window.require('electron');
            this._ipc = ipcRenderer;
        } catch (error) {
            console.error(error.message);
        }
    }

    public async Invoke(channel: string, argument?: any): Promise<any> {
        return this._ipc?.invoke(channel, argument);
    }

    public On(channel: string, listener: (event: IpcRendererEvent, argument?: any) => void): this {
        this._ipc?.on(channel, listener);
        return this;
    }

    public Once(channel: string, listener: (event: IpcRendererEvent, argument?: any) => void): this {
        this._ipc?.once(channel, listener);
        return this;
    }

    public PostMessage(channel: string, message: any, transfer?: MessagePort[]): void {
        this._ipc?.postMessage(channel, message, transfer);
    }

    public RemoveAllListeners(channel: string): this {
        this._ipc?.removeAllListeners(channel);
        return this;
    }

    public RemoveListener(
        channel: string,
        listener: (event: IpcRendererEvent, argument?: any) => void
    ): this {
        this._ipc?.removeListener(channel, listener);
        return this;
    }

    public Send(channel: string, argument?: any): void {
        this._ipc?.send(channel, argument);
    }

    public SendSync(channel: string, argument?: any): any {
        return this._ipc?.sendSync(channel, argument);
    }

    public SendTo(webContentsId: number, channel: string, argument?: any): void {
        this._ipc?.sendTo(webContentsId, channel, argument);
    }

    public SendToHost(channel: string, argument?: any): void {
        this._ipc?.sendToHost(channel, argument);
    }
}

export const IpcRenderer = new IpcRendererWrapper();
