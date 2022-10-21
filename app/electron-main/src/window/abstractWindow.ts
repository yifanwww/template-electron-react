import { IpcServer, WindowType } from '@tecra-pkg/electron-common';
import { BrowserWindow, shell } from 'electron';
import path from 'path';

import { appPaths } from 'src/appPaths';

import { AbstractWindowOption, CloseWindowOption } from './types';

export abstract class AbstractWindow {
    protected readonly window: BrowserWindow;
    protected readonly windowType: WindowType;
    protected readonly windowId: string;

    private readonly onClose: (option: CloseWindowOption) => void | Promise<void>;

    protected readonly _ipcServer: IpcServer;

    constructor(option: AbstractWindowOption) {
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

    async show(): Promise<void> {
        if (process.env.NODE_ENV === 'production') {
            await this.window.loadFile(path.resolve(appPaths.src, 'index.html'));
        } else {
            await this.window.loadURL('http://localhost:4321/');
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