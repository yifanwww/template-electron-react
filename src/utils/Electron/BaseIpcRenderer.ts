import { IpcRendererWrapper } from './IpcRendererWrapper';

export class BaseIpcRenderer {
    protected static readonly _ipc = new IpcRendererWrapper();
}
