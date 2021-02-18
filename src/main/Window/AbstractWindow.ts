import Path from 'path';
import { BrowserWindow, IpcMainEvent } from 'electron';

import { WindowType } from '#shared/WindowType';
import { IpcMListener } from '#shared/IpcTypes';

import { windowIpc } from '../Ipc';

// eslint-disable-next-line import/no-cycle
import { createWindow } from './CreateWindow';

export interface CreateWindowOption {
    production: boolean;
    height?: number;
    width?: number;
}

export abstract class AbstractWindow {
    protected window?: BrowserWindow;
    protected readonly windowType: WindowType;

    public constructor(windowType: WindowType) {
        this.window = undefined;
        this.windowType = windowType;
    }

    public async create(options: CreateWindowOption): Promise<void> {
        if (this.window !== undefined) return;

        const { production, height, width } = options;

        // NOTE:
        // In electron 12 or higher-version electron:
        // - `contextIsolation` will be true by default, and considering about security we should not set it false.
        // - `nodeIntegration` option will be deleted.
        this.window = new BrowserWindow({
            width: width === undefined ? 1280 : width,
            height: height === undefined ? 720 : height,
            webPreferences: {
                contextIsolation: false,
                enableRemoteModule: false,
                nodeIntegration: true,
            },
        });

        this.addWindowListeners();
        this.addIpcListeners();

        if (production) {
            await this.window.loadFile(Path.join(__dirname, 'index.html'));
        } else {
            await this.window.loadURL('http://localhost:3000/');
        }

        this.window.show();
    }

    // -------------------------------------------------------------------------------------- Getter

    public get state(): boolean {
        return this.window !== undefined;
    }

    // ---------------------------------------------------------------------------- Window Listeners

    protected addWindowListeners(): void {
        this.window!.once('closed', this.onWindowClosed);
    }

    protected removeWindowListeners(): void {}

    // ----------------------------------------------------------------------------- Window Handlers

    private onWindowClosed = () => {
        this.removeWindowListeners();
        this.removeIpcListeners();
        this.window = undefined;
    };

    // ------------------------------------------------------------------------------- Ipc Listeners

    protected addIpcListeners(): void {
        windowIpc.onNewWindowToOpen(this.bOnNewWindowToOpen);
        windowIpc.onWindowTypeToGet(this.bOnWindowTypeToGet);
    }

    protected removeIpcListeners(): void {
        windowIpc.removeNewWindowToOpen(this.bOnNewWindowToOpen);
        windowIpc.removeWindowTypeToGet(this.bOnWindowTypeToGet);
    }

    // -------------------------------------------------------------------------------- Ipc Handlers

    protected checkSender(event: IpcMainEvent): boolean {
        return event.sender.id === this.window!.id;
    }

    private onWindowTypeToGet = (event: IpcMainEvent): void => {
        if (this.checkSender(event)) event.returnValue = this.windowType;
    };

    protected onNewWindowToOpen(event: any, windowType: WindowType): void {
        if (this.checkSender(event)) createWindow(windowType);
    }

    private bOnNewWindowToOpen: IpcMListener<WindowType> = (event, windowType) =>
        this.onNewWindowToOpen(event, windowType);
    private bOnWindowTypeToGet: IpcMListener = (event) => this.onWindowTypeToGet(event);
}
