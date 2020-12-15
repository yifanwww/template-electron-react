import { WindowType } from '#shared/WindowType';

import { IpcRendererWrapper } from './IpcRendererWrapper';

export class BaseIpcRenderer {
    protected readonly ipc = new IpcRendererWrapper();

    public newWindowToOpen = 'NewWindowToOpen';
    public windowType = 'WindowType';

    public getWindowType(): WindowType {
        return this.ipc.sendSync(this.windowType);
    }

    public openNewWindow(windowType: WindowType): void {
        this.ipc.send(this.newWindowToOpen, windowType);
    }
}

export const baseIpcRenderer = new BaseIpcRenderer();
