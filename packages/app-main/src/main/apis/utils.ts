import type { IpcMainHandler } from '@ter/app-common/apis/types';
import type { AnyFn } from '@ter/app-common/types';
import { ipcMain } from 'electron';

interface Handlers<Handler> {
    [windowId: string]: Handler;
}

export class HandlerRegister<Handler extends IpcMainHandler<AnyFn>> {
    private declare readonly _channel: string;
    private declare _handlers: Handlers<Handler>;

    constructor(channel: string) {
        this._channel = channel;
        this._handlers = {};
    }

    register(windowId: string, handler: Handler) {
        if (this._handlers[windowId]) {
            ipcMain.removeListener(this._channel, this._handlers[windowId]);
        }
        this._handlers[windowId] = handler;

        ipcMain.handle(this._channel, handler);
    }

    remove(windowId: string) {
        if (this._handlers[windowId]) {
            ipcMain.removeListener(this._channel, this._handlers[windowId]);
        }
    }

    clear() {
        for (const windowId in this._handlers) {
            ipcMain.removeListener(this._channel, this._handlers[windowId]);
        }
        this._handlers = {};
    }
}
