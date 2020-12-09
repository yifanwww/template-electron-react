import { WindowType } from '#Utils';

import { IpcRendererWrapper } from './IpcRendererWrapper';
import { IpcRendererFunc } from './IpcWrapper.types';
import { ClientAreaSize } from './BaseIpc.types';

export class BaseIpcRenderer {
    protected readonly ipc = new IpcRendererWrapper();

    public clientAreaInitialized = 'ClientAreaInitialized';
    public newWindowToOpen = 'NewWindowToOpen';
    public windowResized = 'WindowResized';
    public windowType = 'WindowType';

    public getWindowType(): WindowType {
        return this.ipc.sendSync(this.windowType);
    }

    public onceClientAreaInitialized(func: IpcRendererFunc<ClientAreaSize>): void {
        this.ipc.once(this.clientAreaInitialized, func);
    }

    public sendClientAreaInitialized(): void {
        this.ipc.send(this.clientAreaInitialized);
    }

    public onWindowResized(func: IpcRendererFunc<ClientAreaSize>): void {
        this.ipc.on(this.windowResized, func);
    }

    public removeWindowResized(func: IpcRendererFunc<ClientAreaSize>): void {
        this.ipc.removeListener(this.windowResized, func);
    }

    public openNewWindow(windowType: WindowType): void {
        this.ipc.send(this.newWindowToOpen, windowType);
    }
}

export const baseIpcRenderer = new BaseIpcRenderer();
