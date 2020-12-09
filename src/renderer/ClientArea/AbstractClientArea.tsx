/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component } from 'react';
import { IpcRendererEvent } from 'electron';

import { ClientAreaSize, baseIpcRenderer } from '#Electron';

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
        baseIpcRenderer.onceClientAreaInitialized(this.wrapperClientAreaInitialized);
    }

    protected addIpcListeners(): void {
        baseIpcRenderer.onWindowResized(this.wrapperWindowResized);
    }

    protected removeIpcListeners(): void {
        baseIpcRenderer.removeWindowResized(this.wrapperWindowResized);
    }

    protected sendIpcMessage(): void {
        baseIpcRenderer.sendClientAreaInitialized();
    }

    // ---------------------------------------------------------------------------------- Ipc Events

    private wrapperClientAreaInitialized: IpcEvent<ClientAreaSize> = (event, clientAreaSize) =>
        this.onceClientAreaInitialized(event, clientAreaSize);
    protected onceClientAreaInitialized(
        event: IpcRendererEvent,
        clientAreaSize: ClientAreaSize,
    ): void {}

    private wrapperWindowResized: IpcEvent<ClientAreaSize> = (event, clientAreaSize) =>
        this.onWindowResized(event, clientAreaSize);
    protected onWindowResized(event: IpcRendererEvent, clientAreaSize: ClientAreaSize): void {}
}
