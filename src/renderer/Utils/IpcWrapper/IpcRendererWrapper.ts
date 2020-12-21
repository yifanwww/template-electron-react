import { IpcRendererEvent } from 'electron';

export class IpcRendererWrapper {
    private ipc?: Electron.IpcRenderer;

    public constructor() {
        /* eslint-disable max-len */
        // NOTE:
        // In electron 12 or higher-version electron:
        // - `contextIsolation` will be true by default, and considering about security we should not set it false.
        // - `nodeIntegration` option will be deleted.
        // If we set `contextIsolation` true when creating windows, we cannot use global variable `window` here.
        // Also we cannot use `require('electron')` for an error 'fs.existsSync is not a function' raised from `node_modules/electron/index.js`.
        //
        // Which means:
        // Error 'window.require is not a function' will be raised if `contextIsolation` is set true.
        // Error 'fs.existsSync is not a function' will be raised from `node_modules/electron/index.js` if using `const { ipcRenderer } = require('electron')`.
        //
        // More information:
        // [[Discussion] Changing the defaults for nodeIntegration and contextIsolation to improve the default security posture of Electron applications](https://github.com/electron/electron/issues/23506)
        // [Error while importing electron in react | import { ipcRenderer } from 'electron'](https://github.com/electron/electron/issues/9920)
        /* eslint-enable max-len */
        try {
            const { ipcRenderer } = window.require('electron');
            this.ipc = ipcRenderer;
        } catch (error) {
            console.error(error.message);
        }
    }

    public async invoke(channel: string, ...args: any[]): Promise<any> {
        return this.ipc?.invoke(channel, ...args);
    }

    public on(channel: string, listener: (event: IpcRendererEvent, ...args: any[]) => void): this {
        this.ipc?.on(channel, listener);
        return this;
    }

    public once(
        channel: string,
        listener: (event: IpcRendererEvent, ...args: any[]) => void,
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
        listener: (event: IpcRendererEvent, ...args: any[]) => void,
    ): this {
        this.ipc?.removeListener(channel, listener);
        return this;
    }

    public send(channel: string, ...args: any[]): void {
        this.ipc?.send(channel, ...args);
    }

    public sendSync(channel: string, ...args: any[]): any {
        return this.ipc?.sendSync(channel, ...args);
    }

    public sendTo(webContentsId: number, channel: string, ...args: any[]): void {
        this.ipc?.sendTo(webContentsId, channel, ...args);
    }

    public sendToHost(channel: string, ...args: any[]): void {
        this.ipc?.sendToHost(channel, ...args);
    }
}
