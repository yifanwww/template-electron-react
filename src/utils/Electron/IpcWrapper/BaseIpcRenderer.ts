import { WindowType } from '@Utils';

import { IpcRendererWrapper } from './IpcRendererWrapper';
import { IpcRendererFunc } from './IpcWrapper.types';
import { ClientAreaSize } from './BaseIpc.types';

export class BaseIpcRendererClass {
    protected readonly _ipc = new IpcRendererWrapper();

    public ClientAreaInitialized = 'ClientAreaInitialized';
    public NewWindowToOpen = 'NewWindowToOpen';
    public WindowResized = 'WindowResized';
    public WindowType = 'WindowType';

    public GetWindowType(): WindowType {
        return this._ipc.SendSync(this.WindowType);
    }

    public OnceClientAreaInitialized(func: IpcRendererFunc<ClientAreaSize>): void {
        this._ipc.Once(this.ClientAreaInitialized, func);
    }

    public SendClientAreaInitialized(): void {
        this._ipc.Send(this.ClientAreaInitialized);
    }

    public OnWindowResized(func: IpcRendererFunc<ClientAreaSize>): void {
        this._ipc.On(this.WindowResized, func);
    }

    public RemoveWindowResized(func: IpcRendererFunc<ClientAreaSize>): void {
        this._ipc.RemoveListener(this.WindowResized, func);
    }

    public OpenNewWindow(windowType: WindowType): void {
        this._ipc.Send(this.NewWindowToOpen, windowType);
    }
}

export const BaseIpcRenderer = new BaseIpcRendererClass();
