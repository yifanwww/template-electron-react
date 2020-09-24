import { IpcRendererWrapper } from './IpcRendererWrapper';

export class BaseCustomIpcRenderer {
    protected readonly _ipc: IpcRendererWrapper;

    public constructor() {
        this._ipc = new IpcRendererWrapper();
    }
}

export const BaseIpcRenderer = new BaseCustomIpcRenderer();
