/* eslint-disable @typescript-eslint/no-unused-vars */
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
        this.AddIpcListeners();
        this.AddIpcOnceListeners();
        this.SendIpcMessage();
    }

    public componentWillUnmount(): void {
        this.RemoveIpcListeners();
    }

    // ------------------------------------------------------------------------------- Ipc Listeners

    protected AddIpcOnceListeners(): void {
        BaseIpcRenderer.OnceClientAreaInitialized(this.Wrapper_ClientAreaInitialized);
    }

    protected AddIpcListeners(): void {
        BaseIpcRenderer.OnWindowResized(this.Wrapper_WindowResized);
    }

    protected RemoveIpcListeners(): void {
        BaseIpcRenderer.RemoveWindowResized(this.Wrapper_WindowResized);
    }

    protected SendIpcMessage(): void {
        BaseIpcRenderer.SendClientAreaInitialized();
    }

    // ---------------------------------------------------------------------------------- Ipc Events

    private Wrapper_ClientAreaInitialized: IpcEvent<ClientAreaSize> = (event, clientAreaSize) =>
        this.OnceClientAreaInitialized(event, clientAreaSize);
    protected OnceClientAreaInitialized(
        event: IpcRendererEvent,
        clientAreaSize: ClientAreaSize,
    ): void {}

    private Wrapper_WindowResized: IpcEvent<ClientAreaSize> = (event, clientAreaSize) =>
        this.OnWindowResized(event, clientAreaSize);
    protected OnWindowResized(event: IpcRendererEvent, clientAreaSize: ClientAreaSize): void {}
}
