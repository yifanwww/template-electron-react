import { Component } from 'react';
import { IpcRendererEvent } from 'electron';
import { IpcRenderer } from '@Electron';
import { PartWindowChannels } from '@Utils/Window';

type IpcEvent<Args = undefined> = Args extends undefined
    ? (event: IpcRendererEvent) => void
    : (event: IpcRendererEvent, args: Args) => void;

export interface Size {
    width: number;
    height: number;
}

export abstract class AbstractClientArea<P, S> extends Component<P, S> {
    protected readonly _partWindowChannels: PartWindowChannels;

    // --------------------------------------------------------------------------------------- React

    public constructor(props: Readonly<P>, partWindowChannels: PartWindowChannels) {
        super(props);

        this._partWindowChannels = partWindowChannels;
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
        IpcRenderer.Once(
            this._partWindowChannels.ClientAreaInitialized,
            this._Wrapper_ClientAreaInitialized
        );
    }

    protected _AddIpcListeners(): void {
        IpcRenderer.On(this._partWindowChannels.WindowResized, this._Wrapper_WindowResized);
    }

    protected _RemoveIpcListeners(): void {
        IpcRenderer.RemoveListener(
            this._partWindowChannels.WindowResized,
            this._Wrapper_WindowResized
        );
    }

    protected _SendIpcMessage(): void {
        IpcRenderer.Send(this._partWindowChannels.ClientAreaInitialized);
    }

    // ---------------------------------------------------------------------------------- Ipc Events

    private _Wrapper_ClientAreaInitialized: IpcEvent<Size> = (event, clientAreaSize) =>
        this._OnceClientAreaInitialized(event, clientAreaSize);
    protected _OnceClientAreaInitialized(event: IpcRendererEvent, clientAreaSize: Size): void {}

    private _Wrapper_WindowResized: IpcEvent<Size> = (event, clientAreaSize) =>
        this._OnWindowResized(event, clientAreaSize);
    protected _OnWindowResized(event: IpcRendererEvent, clientAreaSize: Size): void {}
}
