import type { WindowType } from '@ter/app-common/apis/app';
import { BrowserWindow, shell } from 'electron';
import path from 'node:path';
import type winston from 'winston';

import { registerLoggerHandlers } from '../apis/logger';
import { AppInfo } from '../appInfo';
import { WindowStateKeeper } from '../configuration';
import { AppLogger } from '../logger';

import type { AbstractWindowOption, CloseWindowOption } from './types';

export abstract class AbstractWindow {
    protected readonly _window: BrowserWindow;
    protected readonly _windowType: WindowType;

    protected readonly _logger: winston.Logger;

    private readonly _onClose: (option: CloseWindowOption) => void | Promise<void>;

    constructor(option: AbstractWindowOption) {
        this._windowType = option.type;

        const windowStateKeeper = new WindowStateKeeper(this._windowType);

        this._window = new BrowserWindow({
            x: windowStateKeeper.x,
            y: windowStateKeeper.y,
            width: windowStateKeeper.width,
            height: windowStateKeeper.height,

            webPreferences: {
                additionalArguments: [`--window-type=${this._windowType}`],
                preload: path.resolve(AppInfo.INSTANCE.srcPath, 'preload.js'),
            },
        });
        if (windowStateKeeper.maximized) this._window.maximize();
        if (windowStateKeeper.fullScreen) this._window.setFullScreen(true);
        windowStateKeeper.registerHandlers(this._window);

        this._logger = AppLogger.createLogger(`${this._windowType}-${this.id}`);

        this._onClose = option.onClose;

        this._addWindowListeners();
        this._addAPIHandlers();
    }

    get id() {
        return this._window.id;
    }

    async show(): Promise<void> {
        if (process.env.NODE_ENV === 'production') {
            await this._window.loadFile(path.resolve(AppInfo.INSTANCE.srcPath, 'index.html'));
        } else {
            await this._window.loadURL('http://localhost:4321/');
        }

        this._window.show();
    }

    private _close = () => {
        this._logger.info(`"${this._windowType}" window Closed.`);
        void this._onClose({ id: this.id });
    };

    // ------------------------------------------------------------------------------------------------- Window Handlers

    protected _addWindowListeners(): void {
        this._window.webContents.setWindowOpenHandler((details) => {
            void shell.openExternal(details.url);
            return { action: 'deny' };
        });

        this._window.once('show', () => {
            this._logger.info(`"${this._windowType}" window (id "${this.id}") Showed.`);
        });

        this._window.once('closed', this._close);
    }

    // ---------------------------------------------------------------------------------------------------- Ipc Handlers

    protected _addAPIHandlers(): void {
        registerLoggerHandlers(this._window.webContents.ipc, this._logger);
    }
}
