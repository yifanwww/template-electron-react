import { WindowType } from '#shared/WindowType';

import { IpcRListener } from '#shared/IpcWrapper.types';
import { ClientAreaSize } from '#shared/ClientAreaSize.types';

import { IpcRendererWrapper } from './IpcRendererWrapper';

export class BaseIpcRenderer {
    protected readonly ipc = new IpcRendererWrapper();

    public clientAreaInitialized = 'ClientAreaInitialized';
    public newWindowToOpen = 'NewWindowToOpen';
    public windowResized = 'WindowResized';
    public windowType = 'WindowType';

    public getWindowType(): WindowType {
        return this.ipc.sendSync(this.windowType);
    }

    public onceClientAreaInitialized(handler: IpcRListener<ClientAreaSize>): void {
        this.ipc.once(this.clientAreaInitialized, handler);
    }

    public sendClientAreaInitialized(): void {
        this.ipc.send(this.clientAreaInitialized);
    }

    public onWindowResized(handler: IpcRListener<ClientAreaSize>): void {
        this.ipc.on(this.windowResized, handler);
    }

    public removeWindowResized(handler: IpcRListener<ClientAreaSize>): void {
        this.ipc.removeListener(this.windowResized, handler);
    }

    public openNewWindow(windowType: WindowType): void {
        this.ipc.send(this.newWindowToOpen, windowType);
    }
}

export const baseIpcRenderer = new BaseIpcRenderer();
