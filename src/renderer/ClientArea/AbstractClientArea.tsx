import { Component } from 'react';
import { IpcRendererEvent } from 'electron';

export interface Size {
    width: number;
    height: number;
}

export abstract class AbstractClientArea<P, S> extends Component<P, S> {
    // --------------------------------------------------------------------------------------- React

    public componentDidMount(): void {
        this._AddIpcListeners();
        this._AddIpcOnceListeners();
        this._SendIpcMessage();
    }

    public componentWillUnmount(): void {
        this._RemoveIpcListeners();
    }

    // ------------------------------------------------------------------------------- Ipc Listeners

    protected abstract _AddIpcOnceListeners(): void;
    protected abstract _AddIpcListeners(): void;
    protected abstract _RemoveIpcListeners(): void;

    protected abstract _SendIpcMessage(): void;

    // ---------------------------------------------------------------------------------- Ipc Events

    protected abstract _OnceClientAreaInitialized(
        event: IpcRendererEvent,
        clientAreaSize: Size
    ): void;

    protected abstract _OnWindowResized(event: IpcRendererEvent, clientAreaSize: Size): void;
}
