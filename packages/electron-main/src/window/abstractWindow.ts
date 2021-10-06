import { IpcServer, WindowType } from '@tecra/electron-common';
import { BrowserWindow, shell } from 'electron';
import path from 'path';

import { appPaths } from 'src/appPaths';

import { IAbstractWindowOption, ICloseWindowOption } from './types';

export abstract class AbstractWindow {
    protected readonly window: BrowserWindow;
    protected readonly windowType: WindowType;
    protected readonly windowId: string;

    private readonly onClose: (option: ICloseWindowOption) => Promise<void>;

    protected readonly _ipcServer: IpcServer;

    public constructor(option: IAbstractWindowOption) {
        this.windowId = option.windowId;
        this.windowType = option.windowType;

        this.window = new BrowserWindow({
            width: option.width ?? 1280,
            height: option.height ?? 720,
            webPreferences: {
                contextIsolation: false,
                nodeIntegration: true,
            },
        });

        this._ipcServer = new IpcServer(this.window.id);

        this.onClose = option.onClose;

        this.addWindowListeners();
        this.addIpcListeners();
    }

    public async show(): Promise<void> {
        if (process.env.NODE_ENV === 'production') {
            await this.window.loadFile(path.resolve(appPaths.src, 'index.html'));
        } else {
            await this.window.loadURL('http://localhost:3000/');
        }

        this.window.show();
    }

    // ------------------------------------------------------------------------------------------------- Window Handlers

    protected addWindowListeners(): void {
        this.window.webContents.setWindowOpenHandler((details) => {
            shell.openExternal(details.url);
            return { action: 'deny' };
        });

        this.window.once('closed', this.close);
    }

    private close = () => {
        this.removeIpcListeners();

        this.onClose({ windowId: this.windowId });
    };

    // ---------------------------------------------------------------------------------------------------- Ipc Handlers

    protected addIpcListeners(): void {
        this._ipcServer.handleGetWindowType(() => this.windowType);
    }

    private removeIpcListeners = () => this._ipcServer.clear();
}
