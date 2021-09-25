import { IpcChannels, WindowType } from '@tecra/electron-common';
import path from 'path';
import { BrowserWindow, IpcMainEvent, IpcMainInvokeEvent } from 'electron';

import { IpcMainWrapper } from '#MUtils/IpcMain';

import { appPaths } from '../AppPaths';
import { IAbstractWindowOption, ICloseWindowOption, ICreateWindowOption } from './Types';

export abstract class AbstractWindow {
    protected readonly window: BrowserWindow;
    protected readonly windowType: WindowType;
    protected readonly windowId: string;

    private readonly createWindow: (option: ICreateWindowOption) => Promise<void>;
    private readonly onClosedWindow: (option: ICloseWindowOption) => Promise<void>;

    protected readonly ipcs: Array<IpcMainWrapper.Base> = [];

    public constructor(option: IAbstractWindowOption) {
        this.windowId = option.windowId;
        this.windowType = option.windowType;

        this.window = new BrowserWindow({
            width: option.width ?? 1280,
            height: option.height ?? 720,
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
        if (process.env.NODE_ENV === 'production') {
            await this.window.loadFile(path.resolve(appPaths.src, 'index.html'));
        } else {
            await this.window.loadURL('http://localhost:3000/');
        }

        this.window.show();
    }

    // ------------------------------------------------------------------------------------------------- Window Handlers

    protected addWindowListeners(): void {
        this.window!.once('closed', this.onceClosedWindow);
    }

    protected removeWindowListeners(): void {}

    private onceClosedWindow = () => {
        this.removeWindowListeners();
        this.removeIpcListeners();

        this.onClosedWindow({ windowId: this.windowId });
    };

    // ---------------------------------------------------------------------------------------------------- Ipc Handlers

    protected addIpcListeners(): void {
        this.ipcs.push(new IpcMainWrapper.On(IpcChannels.GetWindowType, this.getWindowType));
        this.ipcs.push(new IpcMainWrapper.On(IpcChannels.OpenNewWindow, this.openNewWindow));
    }

    private removeIpcListeners(): void {
        this.ipcs.forEach((ipc) => ipc.remove());
    }

    private checkSender = (event: IpcMainEvent | IpcMainInvokeEvent) => event.sender.id === this.window!.id;

    private getWindowType = (event: IpcMainEvent): void => {
        if (this.checkSender(event)) event.returnValue = this.windowType;
    };

    private openNewWindow = (event: IpcMainEvent, windowType: WindowType): void => {
        if (this.checkSender(event)) this.createWindow({ windowType });
    };
}
