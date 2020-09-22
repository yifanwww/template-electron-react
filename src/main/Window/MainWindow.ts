import { IpcMainEvent, ipcMain } from 'electron';

import { WindowType, WindowChannels } from '@Utils/Window';

import { CreateWindow } from '.';
import { AbstractWindow } from './AbstractWindow';

export class MainWindow extends AbstractWindow {
    public constructor() {
        super(WindowType.MainWindow);
    }

    // ----------------------------------------------------------------------------------- Listeners

    protected _AddIpcListeners(): void {
        ipcMain.on(WindowChannels.MainWindow.ClientAreaInitialized, this._OnClientAreaInitialized);
        ipcMain.on(WindowChannels.MainWindow.WindowToOpen, this._OnNewWindowToOpen);
    }

    protected _RemoveIpcListeners(): void {
        ipcMain.removeListener(
            WindowChannels.MainWindow.ClientAreaInitialized,
            this._OnClientAreaInitialized
        );
        ipcMain.removeListener(WindowChannels.MainWindow.WindowToOpen, this._OnNewWindowToOpen);
    }

    // -------------------------------------------------------------------------------------- Events

    // From Window

    protected _OnWindowResized = (): void => {
        let size = this._window!.getContentSize();

        this._window!.webContents.send(WindowChannels.MainWindow.WindowResized, {
            width: size[0],
            height: size[1],
        });
    };

    protected _OnWindowShowed = (): void => {};

    // From Ipc

    protected _OnClientAreaInitialized = (event: IpcMainEvent): void => {
        let size = this._window!.getContentSize();
        event.reply(WindowChannels.MainWindow.ClientAreaInitialized, {
            width: size[0],
            height: size[1],
        });
    };

    protected _OnNewWindowToOpen = (event: IpcMainEvent, windowType: WindowType): void => {
        CreateWindow(windowType);
    };
}
