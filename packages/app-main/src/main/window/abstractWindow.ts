import type { WindowType } from '@tecra/app-common';
import { BrowserWindow, shell } from 'electron';
import path from 'node:path';

import { appPaths } from 'src/main/appPaths';

import { WindowStateKeeper } from '../configuration';

import type { AbstractWindowOption, CloseWindowOption } from './types';

export abstract class AbstractWindow {
    protected readonly _window: BrowserWindow;
    protected readonly _windowType: WindowType;
    protected readonly _windowId: string;

    private readonly _onClose: (option: CloseWindowOption) => void | Promise<void>;

    constructor(option: AbstractWindowOption) {
        this._windowId = option.windowId;
        this._windowType = option.windowType;

        const windowStateKeeper = new WindowStateKeeper(option.windowType);

        this._window = new BrowserWindow({
            x: windowStateKeeper.x,
            y: windowStateKeeper.y,
            width: windowStateKeeper.width,
            height: windowStateKeeper.height,

            webPreferences: {
                additionalArguments: [`--window-type=${this._windowType}`],
                preload: path.resolve(appPaths.src, 'preload.js'),
            },
        });
        if (windowStateKeeper.maximized) this._window.maximize();
        if (windowStateKeeper.fullScreen) this._window.setFullScreen(true);
        windowStateKeeper.registerHandlers(this._window);

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
        //
    }

    private _removeAPIHandlers = () => {
        //
    };
}
