import Path from 'path';
import { BrowserWindow, IpcMainEvent } from 'electron';

import { WindowType } from '#shared/WindowType';
import { IpcMListener } from '#shared/IpcWrapper.types';
import { baseIpcMain } from '#MainUtils/IpcWrapper';

// eslint-disable-next-line import/no-cycle
import { createWindow } from './CreateWindow';

export interface CreateWindowOption {
    development: boolean;
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

        const { development, height, width } = options;

        this.window = new BrowserWindow({
            width: width === undefined ? 1280 : width,
            height: height === undefined ? 720 : height,
            webPreferences: {
                enableRemoteModule: true,
                nodeIntegration: true,
            },
        });

        this.addWindowListeners();
        this.addIpcListeners();

        if (!development) {
            await this.window.loadFile(Path.join(__dirname, 'index.html'));
        } else {
            await this.window.loadURL('http://localhost:3000/');
        }

        this.window.show();
    }

    // -------------------------------------------------------------------------------------- Getter

    public get State(): boolean {
        return this.window !== undefined;
    }

    // ---------------------------------------------------------------------------- Window Listeners

    protected addWindowListeners(): void {
        this.window!.on('show', this.bOnWindowShowed);
        this.window!.on('resize', this.bOnWindowResized);
        this.window!.once('closed', this.onWindowClosed);
    }

    protected removeWindowListeners(): void {
        this.window!.removeListener('show', this.bOnWindowShowed);
        this.window!.removeListener('resize', this.bOnWindowResized);
    }

    // ------------------------------------------------------------------------------- Ipc Listeners

    protected addIpcListeners(): void {
        baseIpcMain.onClientAreaInitialized(this.bOnClientAreaInitialized);
        baseIpcMain.onNewWindowToOpen(this.bOnNewWindowToOpen);
        baseIpcMain.onWindowTypeToGet(this.bOnWindowTypeToGet);
    }

    protected removeIpcListeners(): void {
        baseIpcMain.removeClientAreaInitialized(this.bOnClientAreaInitialized);
        baseIpcMain.removeNewWindowToOpen(this.bOnNewWindowToOpen);
        baseIpcMain.removeWindowTypeToGet(this.bOnWindowTypeToGet);
    }

    // ------------------------------------------------------------------------------- Window Events

    private onWindowClosed = () => {
        this.removeWindowListeners();
        this.removeIpcListeners();
        this.window = undefined;
    };

    protected onWindowShowed(): void {}

    protected onWindowResized(): void {
        const size = this.window!.getContentSize();

        this.window!.webContents.send(baseIpcMain.windowResized, {
            width: size[0],
            height: size[1],
        });
    }

    private bOnWindowResized = () => this.onWindowResized();
    private bOnWindowShowed = () => this.onWindowShowed();

    // ---------------------------------------------------------------------------------- Ipc Events

    protected checkSender(event: IpcMainEvent): boolean {
        return event.sender.id === this.window!.id;
    }

    private onWindowTypeToGet = (event: IpcMainEvent): void => {
        if (!this.checkSender(event)) return;

        // console.debug('Send window type.');

        event.returnValue = this.windowType;
    };

    protected onClientAreaInitialized(event: IpcMainEvent): void {
        if (!this.checkSender(event)) return;

        // console.debug('Send content size.');

        const size = this.window!.getContentSize();
        event.reply(baseIpcMain.clientAreaInitialized, {
            width: size[0],
            height: size[1],
        });
    }

    protected onNewWindowToOpen(event: any, windowType: WindowType): void {
        if (!this.checkSender(event)) return;

        // console.debug('Try to create a new window.');

        createWindow(windowType);
    }

    private bOnClientAreaInitialized: IpcMListener = (event) => this.onClientAreaInitialized(event);
    private bOnNewWindowToOpen: IpcMListener<WindowType> = (event, windowType) =>
        this.onNewWindowToOpen(event, windowType);
    private bOnWindowTypeToGet: IpcMListener = (event) => this.onWindowTypeToGet(event);
}
