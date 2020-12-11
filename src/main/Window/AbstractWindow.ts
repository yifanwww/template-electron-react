import Path from 'path';
import { BrowserWindow, IpcMainEvent } from 'electron';

import { WindowType } from '#shared/WindowType';
import { baseIpcMain } from '#MainUtils/IpcWrapper';

import { createWindow } from './CreateWindow';

type WindowEvent = () => void;
type IpcEvent<Args = undefined> = Args extends undefined
    ? (event: IpcMainEvent) => void
    : (event: IpcMainEvent, args: Args) => void;

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
        this.window!.on('show', this.wrapperWindowShowed);
        this.window!.on('resize', this.wrapperWindowResized);
        this.window!.once('closed', this.onWindowClosed);
    }

    protected removeWindowListeners(): void {
        this.window!.removeListener('show', this.wrapperWindowShowed);
        this.window!.removeListener('resize', this.wrapperWindowResized);
    }

    // ------------------------------------------------------------------------------- Ipc Listeners

    protected addIpcListeners(): void {
        baseIpcMain.onClientAreaInitialized(this.wrapperClientAreaInitialized);
        baseIpcMain.onNewWindowToOpen(this.wrapperNewWindowToOpen);
        baseIpcMain.onWindowTypeToGet(this.wrapperWindowTypeToGet);
    }

    protected removeIpcListeners(): void {
        baseIpcMain.removeClientAreaInitialized(this.wrapperClientAreaInitialized);
        baseIpcMain.removeNewWindowToOpen(this.wrapperNewWindowToOpen);
        baseIpcMain.removeWindowTypeToGet(this.wrapperWindowTypeToGet);
    }

    // ------------------------------------------------------------------------------- Window Events

    private onWindowClosed: WindowEvent = () => {
        this.removeWindowListeners();
        this.removeIpcListeners();
        this.window = undefined;
    };

    private wrapperWindowShowed: WindowEvent = () => this.onWindowShowed();
    private wrapperWindowResized: WindowEvent = () => this.onWindowResized();

    protected onWindowShowed(): void {}

    protected onWindowResized(): void {
        const size = this.window!.getContentSize();

        this.window!.webContents.send(baseIpcMain.windowResized, {
            width: size[0],
            height: size[1],
        });
    }

    // ---------------------------------------------------------------------------------- Ipc Events

    protected invokeEventHandler(event: IpcMainEvent, eventHandler: () => void) {
        if (event.sender.id === this.window!.id) {
            eventHandler();
        }
    }

    private wrapperWindowTypeToGet: IpcEvent = (event) =>
        this.invokeEventHandler(event, () => this.onWindowTypeToGet(event));

    private onWindowTypeToGet = (event: IpcMainEvent): void => {
        // console.debug('Send window type.');

        event.returnValue = this.windowType;
    };

    private wrapperClientAreaInitialized: IpcEvent = (event) =>
        this.invokeEventHandler(event, () => this.onClientAreaInitialized(event));

    protected onClientAreaInitialized(event: IpcMainEvent): void {
        // console.debug('Send content size.');

        const size = this.window!.getContentSize();
        event.reply(baseIpcMain.clientAreaInitialized, {
            width: size[0],
            height: size[1],
        });
    }

    private wrapperNewWindowToOpen: IpcEvent<number> = (event, windowType) =>
        this.invokeEventHandler(event, () => this.onNewWindowToOpen(event, windowType));

    protected onNewWindowToOpen(event: any, windowType: WindowType): void {
        // console.debug('Try to create a new window.');

        createWindow(windowType);
    }
}
