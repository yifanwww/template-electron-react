import type { WindowType } from '@app/common/apis/app';
import { BrowserWindow, shell } from 'electron';
import path from 'node:path';

import { registerLoggerHandlers } from '../apis/logger';
import { AppInfo } from '../appInfo';
import { WindowStateKeeper } from '../configuration';
import type { AppLogger } from '../logger';
import { AppLoggerService } from '../logger';

export interface AbstractWindowOptions {
    memorizationEnabled: boolean;
    type: WindowType;
}

export abstract class AbstractWindow {
    protected readonly _window: BrowserWindow;
    protected readonly _windowType: WindowType;

    protected readonly _logger: AppLogger;
    protected readonly _stateKeeper: WindowStateKeeper;

    constructor(options: AbstractWindowOptions) {
        this._windowType = options.type;

        this._stateKeeper = new WindowStateKeeper(this._windowType, options.memorizationEnabled);

        this._window = new BrowserWindow({
            x: this._stateKeeper.x,
            y: this._stateKeeper.y,
            width: this._stateKeeper.width,
            height: this._stateKeeper.height,

            webPreferences: {
                additionalArguments: [`--window-type=${this._windowType}`],
                preload: path.resolve(AppInfo.INSTANCE.srcPath, 'preload.js'),
            },
        });
        if (this._stateKeeper.maximized) this._window.maximize();
        if (this._stateKeeper.fullScreen) this._window.setFullScreen(true);

        this._logger = AppLoggerService.createLogger(`${this._windowType}-${this.id}`);

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

    private _handleClosed = () => {
        this._logger.info(`"${this._windowType}" window Closed.`);
        this._onClosed();
    };

    protected _onClosed() {
        // do nothing
    }

    // ------------------------------------------------------------------------------------------------- Window Handlers

    protected _addWindowListeners(): void {
        this._stateKeeper.register(this._window);

        this._window.webContents.setWindowOpenHandler((details) => {
            void shell.openExternal(details.url);
            return { action: 'deny' };
        });

        this._window.once('show', () => {
            this._logger.info(`"${this._windowType}" window Showed.`);
        });

        this._window.once('closed', this._handleClosed);
    }

    // ---------------------------------------------------------------------------------------------------- Ipc Handlers

    protected _addAPIHandlers(): void {
        registerLoggerHandlers(this._window.webContents.ipc, this._logger);
    }
}
