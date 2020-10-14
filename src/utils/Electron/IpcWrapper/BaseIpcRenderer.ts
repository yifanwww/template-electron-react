import { WindowType } from '@Utils';

import { IpcRendererWrapper } from './IpcRendererWrapper';
import { IpcRendererFunc } from './IpcWrapper.types';
import { ClientAreaSize } from './BaseIpc.types';

export class BaseIpcRendererClass {
    protected readonly ipc = new IpcRendererWrapper();

    public ClientAreaInitialized = 'ClientAreaInitialized';
    public NewWindowToOpen = 'NewWindowToOpen';
    public WindowResized = 'WindowResized';
    public WindowType = 'WindowType';

    public GetWindowType(): WindowType {
        return this.ipc.SendSync(this.WindowType);
    }

    public OnceClientAreaInitialized(func: IpcRendererFunc<ClientAreaSize>): void {
        this.ipc.Once(this.ClientAreaInitialized, func);
    }

    public SendClientAreaInitialized(): void {
        this.ipc.Send(this.ClientAreaInitialized);
    }

    public OnWindowResized(func: IpcRendererFunc<ClientAreaSize>): void {
        this.ipc.On(this.WindowResized, func);
    }

    public RemoveWindowResized(func: IpcRendererFunc<ClientAreaSize>): void {
        this.ipc.RemoveListener(this.WindowResized, func);
    }

    public OpenNewWindow(windowType: WindowType): void {
        this.ipc.Send(this.NewWindowToOpen, windowType);
    }
}

export const BaseIpcRenderer = new BaseIpcRendererClass();
