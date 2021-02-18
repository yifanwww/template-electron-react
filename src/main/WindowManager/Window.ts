import _path from 'path';
import { BrowserWindow, IpcMainEvent } from 'electron';

import { WindowType } from '#shared/WindowType';
import { IpcMListener } from '#shared/IpcTypes';

import { windowIpc } from '../Ipc';
import { CloseWindowOption, CreateWindowOption } from './Window.types';

interface WindowOption {
    windowId: string;
    windowType: WindowType;
    height?: number;
    width?: number;
    onCloseWindow: (option: CloseWindowOption) => Promise<void>;
    onCreateWindow: (option: CreateWindowOption) => Promise<void>;
}

export class Window {
    private static readonly production = process.env.NODE_ENV === 'production';

    private readonly window: BrowserWindow;
    private readonly windowType: WindowType;
    private readonly windowId: string;

    private onCloseWindow: (option: CloseWindowOption) => Promise<void>;
    private onCreateWindow: (option: CreateWindowOption) => Promise<void>;

    public constructor(option: WindowOption) {
        this.windowId = option.windowId;
        this.windowType = option.windowType;

        // NOTE:
        // In electron 12 or higher-version electron:
        // - `contextIsolation` will be true by default, and considering about security we should not set it false.
        // - `nodeIntegration` option will be deleted.
        this.window = new BrowserWindow({
            width: option.width === undefined ? 1280 : option.width,
            height: option.height === undefined ? 720 : option.height,
            webPreferences: {
                contextIsolation: false,
                enableRemoteModule: false,
                nodeIntegration: true,
            },
        });

        this.onCloseWindow = option.onCloseWindow;
        this.onCreateWindow = option.onCreateWindow;
    }

    public async show(): Promise<void> {
        this.addWindowListeners();
        this.addIpcListeners();

        if (Window.production) {
            await this.window.loadFile(_path.join(__dirname, 'index.html'));
        } else {
            await this.window.loadURL('http://localhost:3000/');
        }

        this.window.show();
    }

    // ------------------------------------------------------------------------------------------------ Window Listeners

    private addWindowListeners(): void {
        this.window!.once('closed', this.onWindowClosed);
    }

    private removeWindowListeners(): void {}

    // ------------------------------------------------------------------------------------------------- Window Handlers

    private onWindowClosed = () => {
        this.removeWindowListeners();
        this.removeIpcListeners();

        this.onCloseWindow({ windowId: this.windowId });
    };

    // --------------------------------------------------------------------------------------------------- Ipc Listeners

    private addIpcListeners(): void {
        windowIpc.onNewWindowToOpen(this.bOnNewWindowToOpen);
        windowIpc.onWindowTypeToGet(this.bOnWindowTypeToGet);
    }

    private removeIpcListeners(): void {
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

    private onNewWindowToOpen(event: any, windowType: WindowType): void {
        if (this.checkSender(event)) this.onCreateWindow({ windowType });
    }

    private bOnNewWindowToOpen: IpcMListener<WindowType> = (event, windowType) =>
        this.onNewWindowToOpen(event, windowType);
    private bOnWindowTypeToGet: IpcMListener = (event) => this.onWindowTypeToGet(event);
}
