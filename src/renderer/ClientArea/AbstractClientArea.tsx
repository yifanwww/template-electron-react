/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component } from 'react';
import { IpcRendererEvent } from 'electron';

import { ClientAreaSize } from '#shared/ClientAreaSize.types';
import { baseIpcRenderer } from '#RendererUtils/IpcWrapper';

type IpcEvent<Args = undefined> = Args extends undefined
    ? (event: IpcRendererEvent) => void
    : (event: IpcRendererEvent, args: Args) => void;

export abstract class AbstractClientArea<P, S> extends Component<P, S> {
    // --------------------------------------------------------------------------------------- React

    public constructor(props: Readonly<P>) {
        super(props);
    }

    public componentDidMount(): void {
        this.addIpcListeners();
        this.addIpcOnceListeners();
        this.sendIpcMessage();
    }

    public componentWillUnmount(): void {
        this.removeIpcListeners();
    }

    // ------------------------------------------------------------------------------- Ipc Listeners

    protected addIpcOnceListeners(): void {
        baseIpcRenderer.onceClientAreaInitialized(this.bOnceClientAreaInitialized);
    }

    protected addIpcListeners(): void {
        baseIpcRenderer.onWindowResized(this.bOnWindowResized);
    }

    protected removeIpcListeners(): void {
        baseIpcRenderer.removeWindowResized(this.bOnWindowResized);
    }

    protected sendIpcMessage(): void {
        baseIpcRenderer.sendClientAreaInitialized();
    }

    // ---------------------------------------------------------------------------------- Ipc Events

    protected onceClientAreaInitialized(
        event: IpcRendererEvent,
        clientAreaSize: ClientAreaSize,
    ): void {}

    protected onWindowResized(event: IpcRendererEvent, clientAreaSize: ClientAreaSize): void {}

    private bOnceClientAreaInitialized: IpcEvent<ClientAreaSize> = (event, clientAreaSize) =>
        this.onceClientAreaInitialized(event, clientAreaSize);
    private bOnWindowResized: IpcEvent<ClientAreaSize> = (event, clientAreaSize) =>
        this.onWindowResized(event, clientAreaSize);
}
