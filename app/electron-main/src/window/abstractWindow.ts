import { IpcServer } from '@tecra-pkg/electron-common';
import type { WindowType } from '@tecra-pkg/electron-common';
import { BrowserWindow, shell } from 'electron';
import path from 'path';

import { appPaths } from 'src/appPaths';

import type { AbstractWindowOption, CloseWindowOption } from './types';

export abstract class AbstractWindow {
    protected readonly _window: BrowserWindow;
    protected readonly _windowType: WindowType;
    protected readonly _windowId: string;

    private readonly _onClose: (option: CloseWindowOption) => void | Promise<void>;

    protected readonly _ipcServer: IpcServer;

    constructor(option: AbstractWindowOption) {
        this._windowId = option.windowId;
        this._windowType = option.windowType;

        this._window = new BrowserWindow({
            width: option.width ?? 1280,
            height: option.height ?? 720,
            webPreferences: {
                contextIsolation: false,
                nodeIntegration: true,
            },
        });

        this._ipcServer = new IpcServer(this._window.id);

        this._onClose = option.onClose;

        this._addWindowListeners();
        this._addIpcListeners();
    }

    async show(): Promise<void> {
        if (process.env.NODE_ENV === 'production') {
            await this._window.loadFile(path.resolve(appPaths.src, 'index.html'));
        } else {
            await this._window.loadURL('http://localhost:4321/');
        }

        this._window.show();
    }

    // ------------------------------------------------------------------------------------------------- Window Handlers

    protected _addWindowListeners(): void {
        this._window.webContents.setWindowOpenHandler((details) => {
            void shell.openExternal(details.url);
            return { action: 'deny' };
        });

        this._window.once('closed', this._close);
    }

    private _close = () => {
        this._removeIpcListeners();

        void this._onClose({ windowId: this._windowId });
    };

    // ---------------------------------------------------------------------------------------------------- Ipc Handlers

    protected _addIpcListeners(): void {
        this._ipcServer.handleGetWindowType(() => this._windowType);
    }

    private _removeIpcListeners = () => this._ipcServer.clear();
}
