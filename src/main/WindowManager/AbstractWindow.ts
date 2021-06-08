import _path from 'path';
import { BrowserWindow, IpcMainEvent } from 'electron';

import { WindowType } from '#shared/WindowType';
import { IpcMListener } from '#shared/IpcTypes';
import { windowIpc } from '#MUtils/Ipc';

import { installationPath } from '../constants';
import { CloseWindowOption, CreateWindowOption } from './Window.types';

export interface WindowOption {
    windowId: string;
    windowType: WindowType;
    height?: number;
    width?: number;
    createWindow: (option: CreateWindowOption) => Promise<void>;
    onClosedWindow: (option: CloseWindowOption) => Promise<void>;
}

export abstract class AbstractWindow {
    protected static readonly production = process.env.NODE_ENV === 'production';

    protected readonly window: BrowserWindow;
    protected readonly windowType: WindowType;
    protected readonly windowId: string;

    private readonly createWindow: (option: CreateWindowOption) => Promise<void>;
    private readonly onClosedWindow: (option: CloseWindowOption) => Promise<void>;

    public constructor(option: WindowOption) {
        this.windowId = option.windowId;
        this.windowType = option.windowType;

        this.window = new BrowserWindow({
            width: option.width === undefined ? 1280 : option.width,
            height: option.height === undefined ? 720 : option.height,
            webPreferences: {
                contextIsolation: false,
                enableRemoteModule: false,
                nodeIntegration: true,
            },
        });

        this.createWindow = option.createWindow;
        this.onClosedWindow = option.onClosedWindow;

        this.addWindowListeners();
        this.addIpcListeners();
    }

    public async show(): Promise<void> {
        if (AbstractWindow.production) {
            await this.window.loadFile(_path.resolve(installationPath, 'index.html'));
        } else {
            await this.window.loadURL('http://localhost:3000/');
        }

        this.window.show();
    }

    // ------------------------------------------------------------------------------------------------ Window Listeners

    protected addWindowListeners(): void {
        this.window!.once('closed', this.onceClosedWindow);
    }

    protected removeWindowListeners(): void {}

    // ------------------------------------------------------------------------------------------------- Window Handlers

    private onceClosedWindow = () => {
        this.removeWindowListeners();
        this.removeIpcListeners();

        this.onClosedWindow({ windowId: this.windowId });
    };

    // --------------------------------------------------------------------------------------------------- Ipc Listeners

    protected addIpcListeners(): void {
        windowIpc.onNewWindowToOpen(this.bOnNewWindowToOpen);
        windowIpc.onWindowTypeToGet(this.bOnWindowTypeToGet);
    }

    protected removeIpcListeners(): void {
        windowIpc.removeNewWindowToOpen(this.bOnNewWindowToOpen);
        windowIpc.removeWindowTypeToGet(this.bOnWindowTypeToGet);
    }

    // ---------------------------------------------------------------------------------------------------- Ipc Handlers

    private checkSender(event: IpcMainEvent): boolean {
        return event.sender.id === this.window!.id;
    }

    private onWindowTypeToGet = (event: IpcMainEvent): void => {
        if (this.checkSender(event)) event.returnValue = this.windowType;
    };

    private onNewWindowToOpen(event: IpcMainEvent, windowType: WindowType): void {
        if (this.checkSender(event)) this.createWindow({ windowType });
    }

    private bOnNewWindowToOpen: IpcMListener<WindowType> = (event, windowType) =>
        this.onNewWindowToOpen(event, windowType);
    private bOnWindowTypeToGet: IpcMListener = (event) => this.onWindowTypeToGet(event);
}
