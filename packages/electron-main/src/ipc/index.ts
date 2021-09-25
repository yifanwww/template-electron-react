/* eslint-disable max-classes-per-file */

import { IpcMainHandler, IpcMainListener } from '@tecra/electron-common';
import { ipcMain } from 'electron';

export namespace IpcMainWrapper {
    export abstract class Base {
        public remove() {}
    }

    export class Handle<ReturnType, Args extends unknown[]> extends Base {
        private _channel: string;
        private _listener: IpcMainHandler<ReturnType, Args>;

        public constructor(channel: string, listener: IpcMainHandler<ReturnType, Args>) {
            super();

            this._channel = channel;
            this._listener = listener;

            ipcMain.handle(channel, listener as never);
        }

        public override remove() {
            ipcMain.removeListener(this._channel, this._listener as never);
        }
    }

    export class HandleOnce<ReturnType, Args extends unknown[]> extends Base {
        public constructor(channel: string, listener: IpcMainHandler<ReturnType, Args>) {
            super();
            ipcMain.handleOnce(channel, listener as never);
        }
    }

    export class On<Args extends unknown[]> extends Base {
        private _channel: string;
        private _listener: IpcMainListener<Args>;

        public constructor(channel: string, listener: IpcMainListener<Args>) {
            super();

            this._channel = channel;
            this._listener = listener;

            ipcMain.on(channel, listener as never);
        }

        public override remove() {
            ipcMain.removeListener(this._channel, this._listener as never);
        }
    }

    export class Once<Args extends unknown[]> extends Base {
        public constructor(channel: string, listener: IpcMainListener<Args>) {
            super();
            ipcMain.once(channel, listener as never);
        }
    }
}
