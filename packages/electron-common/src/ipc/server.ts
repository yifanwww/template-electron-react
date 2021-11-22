import { ipcMain, IpcMainEvent, IpcMainInvokeEvent } from 'electron';

import { AppDetails, WindowType } from '../type';
import { IpcChannels } from './channels';
import { IpcMainHandler, IpcMainListener } from './types';

const ipcMainFactory = {
    handle: <Return extends Promise<unknown> | unknown, Args extends unknown[]>(channel: string) => {
        return (listener: IpcMainHandler<Return, Args>) => ipcMain.handle(channel, listener as never);
    },
    handleOnce: <Return extends Promise<unknown> | unknown, Args extends unknown[]>(channel: string) => {
        return (listener: IpcMainHandler<Return, Args>) => ipcMain.handleOnce(channel, listener as never);
    },
    on: <Args extends unknown[]>(channel: string) => {
        return (listener: IpcMainListener<Args>) => ipcMain.on(channel, listener as never);
    },
    once: <Args extends unknown[]>(channel: string) => {
        return (listener: IpcMainListener<Args>) => ipcMain.once(channel, listener as never);
    },
};

interface Listeners {
    [channel: string]: (...args: unknown[]) => never;
}

export class IpcServer {
    private readonly _windowId: number;

    private _listeners: Listeners = {};

    public constructor(windowId: number) {
        this._windowId = windowId;
    }

    private _checkSender = (event: IpcMainEvent | IpcMainInvokeEvent) => event.sender.id === this._windowId;

    private _handleFactory<Return extends Promise<unknown> | unknown, Args extends unknown[]>(channel: string) {
        return (listener: IpcMainHandler<Return, Args>) => {
            const _listener: IpcMainHandler<Return, Args> = (event, ...args) =>
                this._checkSender(event) ? listener(event, ...args) : (null as Return);

            // HACK: Maybe `ipcMain.removeHandler(channel)`?
            if (channel in this._listeners) ipcMain.removeListener(channel, this._listeners[channel]);
            this._listeners[channel] = _listener as never;

            return ipcMain.handle(channel, _listener as never);
        };
    }

    private _handleOnceFactory<Return extends Promise<unknown> | unknown, Args extends unknown[]>(channel: string) {
        return (listener: IpcMainHandler<Return, Args>) => {
            const _listener: IpcMainHandler<Return, Args> = (event, ...args) =>
                this._checkSender(event) ? listener(event, ...args) : (null as Return);

            return ipcMain.handle(channel, _listener as never);
        };
    }

    private _onFactory<Args extends unknown[]>(channel: string) {
        return (listener: IpcMainListener<Args>) => {
            const _listener: IpcMainListener<Args> = (event, ...args) =>
                this._checkSender(event) ? listener(event, ...args) : undefined;

            if (channel in this._listeners) ipcMain.removeListener(channel, this._listeners[channel]);
            this._listeners[channel] = _listener as never;

            return ipcMain.handle(channel, _listener as never);
        };
    }

    private _onOnceFactory<Args extends unknown[]>(channel: string) {
        return (listener: IpcMainListener<Args>) => {
            const _listener: IpcMainListener<Args> = (event, ...args) =>
                this._checkSender(event) ? listener(event, ...args) : undefined;

            return ipcMain.handle(channel, _listener as never);
        };
    }

    public clear(): void {
        for (const channel in this._listeners) {
            ipcMain.removeListener(channel, this._listeners[channel]);
        }
        this._listeners = {};
    }

    public static handleCreateWindow = ipcMainFactory.handle<void, [windowType: WindowType]>(IpcChannels.CreateWindow);
    public static handleGetAppDetails = ipcMainFactory.handle<AppDetails, []>(IpcChannels.GetAppDetails);

    public handleGetWindowType = this._handleFactory<WindowType, []>(IpcChannels.GetWindowType);
}
