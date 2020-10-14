/* eslint-disable @typescript-eslint/no-unused-vars */
import Path from 'path';
import { BrowserWindow, IpcMainEvent } from 'electron';

import { WindowType } from '@Utils';

import { BaseIpcMain } from '@Electron';
import { CreateWindow } from '.';

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

    public async Create(options: CreateWindowOption): Promise<void> {
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

        this.AddWindowListeners();
        this.AddIpcListeners();

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

    protected AddWindowListeners(): void {
        this.window!.on('show', this.Wrapper_WindowShowed);
        this.window!.on('resize', this.Wrapper_WindowResized);
        this.window!.once('closed', this.OnWindowClosed);
    }

    protected RemoveWindowListeners(): void {
        this.window!.removeListener('show', this.Wrapper_WindowShowed);
        this.window!.removeListener('resize', this.Wrapper_WindowResized);
    }

    // ------------------------------------------------------------------------------- Ipc Listeners

    protected AddIpcListeners(): void {
        BaseIpcMain.OnClientAreaInitialized(this.Wrapper_ClientAreaInitialized);
        BaseIpcMain.OnNewWindowToOpen(this.Wrapper_NewWindowToOpen);
        BaseIpcMain.OnWindowTypeToGet(this.Wrapper_WindowTypeToGet);
    }

    protected RemoveIpcListeners(): void {
        BaseIpcMain.RemoveClientAreaInitialized(this.Wrapper_ClientAreaInitialized);
        BaseIpcMain.RemoveNewWindowToOpen(this.Wrapper_NewWindowToOpen);
        BaseIpcMain.RemoveWindowTypeToGet(this.Wrapper_WindowTypeToGet);
    }

    // ------------------------------------------------------------------------------- Window Events

    private OnWindowClosed: WindowEvent = () => {
        this.RemoveWindowListeners();
        this.RemoveIpcListeners();
        this.window = undefined;
    };

    private Wrapper_WindowShowed: WindowEvent = () => this.OnWindowShowed();
    protected OnWindowShowed(): void {}

    private Wrapper_WindowResized: WindowEvent = () => this.OnWindowResized();
    protected OnWindowResized(): void {
        const size = this.window!.getContentSize();

        this.window!.webContents.send(BaseIpcMain.WindowResized, {
            width: size[0],
            height: size[1],
        });
    }

    // ---------------------------------------------------------------------------------- Ipc Events

    protected InvokeEventHandler(event: IpcMainEvent, eventHandler: () => void) {
        if (event.sender.id === this.window!.id) {
            eventHandler();
        }
    }

    private Wrapper_WindowTypeToGet: IpcEvent = (event) =>
        this.InvokeEventHandler(event, () => this.OnWindowTypeToGet(event));

    private OnWindowTypeToGet = (event: IpcMainEvent): void => {
        console.debug('Send window type.');

        event.returnValue = this.windowType;
    };

    private Wrapper_ClientAreaInitialized: IpcEvent = (event) =>
        this.InvokeEventHandler(event, () => this.OnClientAreaInitialized(event));

    protected OnClientAreaInitialized(event: IpcMainEvent): void {
        console.debug('Send content size.');

        const size = this.window!.getContentSize();
        event.reply(BaseIpcMain.ClientAreaInitialized, {
            width: size[0],
            height: size[1],
        });
    }

    private Wrapper_NewWindowToOpen: IpcEvent<number> = (event, windowType) =>
        this.InvokeEventHandler(event, () => this.OnNewWindowToOpen(event, windowType));

    protected OnNewWindowToOpen(event: any, windowType: WindowType): void {
        console.debug('Try to create a new window.');

        CreateWindow(windowType);
    }
}
