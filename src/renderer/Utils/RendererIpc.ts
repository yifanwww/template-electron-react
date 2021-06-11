import { ipcRenderer } from 'electron';

import { Channels } from '#shared/Ipc';
import { WindowType } from '#shared/WindowType';

class RendererIpc {
    public getWindowType(): WindowType {
        return ipcRenderer.sendSync(Channels.GetWindowType);
    }

    public openNewWindow(windowType: WindowType): void {
        ipcRenderer.send(Channels.OpenNewWindow, windowType);
    }
}

export const rendererIpc = new RendererIpc();
