export class IpcRendererWrapper {
    private ipc?: Electron.IpcRenderer;

    public constructor(ipc?: Electron.IpcRenderer) {
        this.ipc = ipc;
    }

    public async Invoke(channel: string, ...args: any[]): Promise<any> {
        this.ipc?.invoke(channel, ...args);
    }

    public On(channel: string, listener: (...args: any[]) => void): this {
        this.ipc?.on(channel, listener);
        return this;
    }

    public Once(channel: string, listener: (...args: any[]) => void): this {
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

    public RemoveListener(channel: string, listener: (...args: any[]) => void): this {
        this.ipc?.removeListener(channel, listener);
        return this;
    }

    public Send(channel: string, ...args: any[]): void {
        this.ipc?.send(channel, ...args);
    }

    public SendSync(channel: string, ...args: any[]): any {
        return this.ipc?.sendSync(channel, ...args);
    }

    public SendTo(webContentsId: number, channel: string, ...args: any[]): void {
        this.ipc?.sendTo(webContentsId, channel, ...args);
    }

    public SendToHost(channel: string, ...args: any[]): void {
        this.ipc?.sendToHost(channel, ...args);
    }
}
