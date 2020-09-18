import { Component } from 'react';
import { IpcRendererEvent } from 'electron';

import { IpcRenderer } from '@Electron';

export interface Size {
    width: number;
    height: number;
}

export abstract class AbstractClientArea<P, S> extends Component<P, S> {
    // --------------------------------------------------------------------------------------- React

    public componentDidMount(): void {
        IpcRenderer.On('ClientAreaInitialized', this.OnClientAreaInitialized);
        IpcRenderer.On('WindowResized', this.OnWindowResized);

        IpcRenderer.Send('ClientAreaInitialized');
    }

    public componentWillUnmount(): void {
        IpcRenderer.RemoveListener('ClientAreaInitialized', this.OnClientAreaInitialized);
        IpcRenderer.RemoveListener('WindowResized', this.OnWindowResized);
    }

    // -------------------------------------------------------------------------------- Ipc Receiver

    protected OnClientAreaInitialized = (event: IpcRendererEvent, clientAreaSize: Size): void => {};

    protected OnWindowResized = (event: IpcRendererEvent, clientAreaSize: Size): void => {};
}
