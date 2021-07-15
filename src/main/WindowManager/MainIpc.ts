import { ipcMain } from 'electron';

import { Channels, IpcMListener } from '#Common/Ipc';
import { WindowType } from '#Common/WindowType';

class MainIpc {
    public onGetWindowType(handler: IpcMListener): this {
        ipcMain.on(Channels.GetWindowType, handler);
        return this;
    }

    public removeGetWindowType(handler: IpcMListener): this {
        ipcMain.removeListener(Channels.GetWindowType, handler);
        return this;
    }

    public onOpenNewWindow(handler: IpcMListener<WindowType>): this {
        ipcMain.on(Channels.OpenNewWindow, handler);
        return this;
    }

    public removeOpenNewWindow(handler: IpcMListener<WindowType>): this {
        ipcMain.removeListener(Channels.OpenNewWindow, handler);
        return this;
    }
}

export const mainIpc = new MainIpc();
