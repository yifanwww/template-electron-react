import Path from 'path';
import { BrowserWindow, IpcMainEvent, ipcMain } from 'electron';

import { WindowType, WindowChannels } from '@Utils/Window';

export interface CreateWindowOption {
    development: boolean;
    height?: number;
    width?: number;
}

export abstract class AbstractWindow {
    protected _window?: BrowserWindow;
    protected readonly _windowType: WindowType;

    public constructor(windowType: WindowType) {
        this._window = undefined;
        this._windowType = windowType;
    }

    public async Create(options: CreateWindowOption): Promise<void> {
        if (this._window !== undefined) return;

        const { development, height, width } = options;

        this._window = new BrowserWindow({
            width: width === undefined ? 1280 : width,
            height: height === undefined ? 720 : height,
            webPreferences: {
                enableRemoteModule: true,
                nodeIntegration: true,
            },
        });

        this._AddWindowListeners();
        this._AddCommonIpcListeners();
        this._AddIpcListeners();

        if (!development) {
            await this._window.loadFile(Path.join(__dirname, 'index.html'));
        } else {
            await this._window.loadURL('http://localhost:3000/');
        }

        this._window.show();
    }

    // -------------------------------------------------------------------------------------- Getter

    public get State(): boolean {
        return this._window !== undefined;
    }

    // ----------------------------------------------------------------------------------- Listeners

    // Window Listeners

    protected _AddWindowListeners(): void {
        this._window!.on('show', this._OnWindowShowed);
        this._window!.on('resize', this._OnWindowResized);
        this._window!.once('closed', this._OnWindowClosed);
    }

    protected _RemoveWindowListeners(): void {
        this._window!.removeListener('show', this._OnWindowShowed);
        this._window!.removeListener('resize', this._OnWindowResized);
    }

    // Ipc Listeners

    private _AddCommonIpcListeners(): void {
        ipcMain.once(WindowChannels.Common.WindowType, this._OnceWindowTypeToGet);
    }

    protected abstract _AddIpcListeners(): void;
    protected abstract _RemoveIpcListeners(): void;

    // -------------------------------------------------------------------------------------- Events

    // From Window

    private _OnWindowClosed = (): void => {
        this._RemoveWindowListeners();
        this._RemoveIpcListeners();
        this._window = undefined;
    };

    protected abstract _OnWindowResized(): void;
    protected abstract _OnWindowShowed(): void;

    // From Ipc

    private _OnceWindowTypeToGet = (event: IpcMainEvent): void => {
        event.returnValue = this._windowType;
    };

    protected abstract _OnClientAreaInitialized(event: IpcMainEvent): void;
    protected abstract _OnNewWindowToOpen(event: IpcMainEvent, windowType: WindowType): void;
}
