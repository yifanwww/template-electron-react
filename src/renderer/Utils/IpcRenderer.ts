/* eslint-disable max-classes-per-file */

import { ipcRenderer } from 'electron';

import { IpcRendererListener } from '#Common/Ipc';

export namespace IpcRendererWrapper {
    export abstract class Base {
        public remove() {}
    }

    export class On<Args extends unknown[]> extends Base {
        private _channel: string;
        private _listener: IpcRendererListener<Args>;

        public constructor(channel: string, listener: IpcRendererListener<Args>) {
            super();

            this._channel = channel;
            this._listener = listener;

            ipcRenderer.on(channel, listener as never);
        }

        public override remove() {
            ipcRenderer.removeListener(this._channel, this._listener as never);
        }
    }

    export class Once<Args extends unknown[]> extends Base {
        public constructor(channel: string, listener: IpcRendererListener<Args>) {
            super();
            ipcRenderer.on(channel, listener as never);
        }
    }

    export function invoke<ReturnType, Args extends unknown[]>(channel: string, ...args: Args): Promise<ReturnType> {
        return ipcRenderer.invoke(channel, args);
    }

    export function sendSync<ReturnType, Args extends unknown[]>(channel: string, ...args: Args): ReturnType {
        return ipcRenderer.sendSync(channel, ...args);
    }
}
