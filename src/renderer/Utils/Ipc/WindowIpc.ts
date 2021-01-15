import { ipcRenderer } from 'electron';

import { WindowType } from '#shared/WindowType';

export class WindowIpc {
    public newWindowToOpen = 'NewWindowToOpen';
    public windowType = 'WindowType';

    public getWindowType(): WindowType {
        return ipcRenderer.sendSync(this.windowType);
    }

    public openNewWindow(windowType: WindowType): void {
        ipcRenderer.send(this.newWindowToOpen, windowType);
    }
}

export const windowIpc = new WindowIpc();
