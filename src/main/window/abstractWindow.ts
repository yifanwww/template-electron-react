import path from 'node:path';
import { app, BrowserWindow, shell } from 'electron';
import type { WindowType } from '@shared/apis/app';
import { registerLoggerHandlers } from '../apis/logger';
import { appInfo } from '../appInfo';
import { WindowStateKeeper } from '../configuration';
import type { AppLogger } from '../logger';
import { createLogger } from '../logger';

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
      backgroundColor: '#282c34',

      webPreferences: {
        additionalArguments: [`--window-type=${this._windowType}`],
        preload: path.resolve(appInfo.sourcePath, 'preload/index.js'),
      },
    });
    if (this._stateKeeper.maximized) this._window.maximize();
    if (this._stateKeeper.fullScreen) this._window.setFullScreen(true);

    this._logger = createLogger(`${this._windowType}-${this.id}`);

    this._addWindowListeners();
    this._addAPIHandlers();
  }

  get id() {
    return this._window.id;
  }

  async show(): Promise<void> {
    if (!app.isPackaged && process.env.ELECTRON_RENDERER_URL) {
      await this._window.loadURL(process.env.ELECTRON_RENDERER_URL);
    } else {
      await this._window.loadFile(path.resolve(appInfo.sourcePath, 'renderer/index.html'));
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
