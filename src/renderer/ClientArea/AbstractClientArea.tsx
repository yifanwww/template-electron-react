import { Component } from 'react';
import { IpcRendererEvent } from 'electron';

import { ClientAreaSize, BaseIpcRenderer } from '@Electron';

type IpcEvent<Args = undefined> = Args extends undefined
    ? (event: IpcRendererEvent) => void
    : (event: IpcRendererEvent, args: Args) => void;

export abstract class AbstractClientArea<P, S> extends Component<P, S> {
    // --------------------------------------------------------------------------------------- React

    public constructor(props: Readonly<P>) {
        super(props);
    }

    public componentDidMount(): void {
        this._AddIpcListeners();
        this._AddIpcOnceListeners();
        this._SendIpcMessage();
    }

    public componentWillUnmount(): void {
        this._RemoveIpcListeners();
    }

    // ------------------------------------------------------------------------------- Ipc Listeners

    protected _AddIpcOnceListeners(): void {
        BaseIpcRenderer.OnceClientAreaInitialized(this._Wrapper_ClientAreaInitialized);
    }

    protected _AddIpcListeners(): void {
        BaseIpcRenderer.OnWindowResized(this._Wrapper_WindowResized);
    }

    protected _RemoveIpcListeners(): void {
        BaseIpcRenderer.RemoveWindowResized(this._Wrapper_WindowResized);
    }

    protected _SendIpcMessage(): void {
        BaseIpcRenderer.SendClientAreaInitialized();
    }

    // ---------------------------------------------------------------------------------- Ipc Events

    private _Wrapper_ClientAreaInitialized: IpcEvent<ClientAreaSize> = (event, clientAreaSize) =>
        this._OnceClientAreaInitialized(event, clientAreaSize);
    protected _OnceClientAreaInitialized(
        event: IpcRendererEvent,
        clientAreaSize: ClientAreaSize
    ): void {}

    private _Wrapper_WindowResized: IpcEvent<ClientAreaSize> = (event, clientAreaSize) =>
        this._OnWindowResized(event, clientAreaSize);
    protected _OnWindowResized(event: IpcRendererEvent, clientAreaSize: ClientAreaSize): void {}
}
