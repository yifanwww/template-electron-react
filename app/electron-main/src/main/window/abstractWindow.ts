import type { WindowType } from '@tecra-pkg/electron-common';
import { BrowserWindow, shell } from 'electron';
import path from 'path';

import { appPaths } from 'src/main/appPaths';

import { appAPIHandlers } from '../apis/app';

import type { AbstractWindowOption, CloseWindowOption } from './types';

export abstract class AbstractWindow {
    protected readonly _window: BrowserWindow;
    protected readonly _windowType: WindowType;
    protected readonly _windowId: string;

    private readonly _onClose: (option: CloseWindowOption) => void | Promise<void>;

    constructor(option: AbstractWindowOption) {
        this._windowId = option.windowId;
        this._windowType = option.windowType;

        this._window = new BrowserWindow({
            width: option.width ?? 1280,
            height: option.height ?? 720,
            webPreferences: {
                preload: path.resolve(appPaths.src, 'preload.js'),
            },
        });

        this._onClose = option.onClose;

        this._addWindowListeners();
        this._addAPIHandlers();
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
        this._removeAPIHandlers();

        void this._onClose({ windowId: this._windowId });
    };

    // ---------------------------------------------------------------------------------------------------- Ipc Handlers

    protected _addAPIHandlers(): void {
        appAPIHandlers.getWindowType.register(this._windowId, () => this._windowType);
    }

    private _removeAPIHandlers = () => {
        appAPIHandlers.getWindowType.remove(this._windowId);
    };
}
