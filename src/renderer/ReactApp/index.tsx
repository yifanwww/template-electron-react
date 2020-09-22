import React from 'react';
import { Provider } from 'react-redux';

import { IpcRenderer } from '@Electron';
import { WindowChannels } from '@Utils/Window';
import { AbstractClientArea, Size } from '@ClientArea';

import { App } from './App';
import { Store } from './Store';

interface ClientAreaState {
    clientAreaSize: Size;
}

class ClientArea extends AbstractClientArea<{}, ClientAreaState> {
    // --------------------------------------------------------------------------------------- React

    public constructor(props: Readonly<{}>) {
        super(props);

        this.state = {
            clientAreaSize: { width: 1280, height: 720 },
        };
    }

    public render(): JSX.Element {
        return (
            <Provider store={Store}>
                <App />
            </Provider>
        );
    }

    // ------------------------------------------------------------------------------- Ipc Listeners

    protected _AddIpcOnceListeners(): void {
        IpcRenderer.Once(
            WindowChannels.MainWindow.ClientAreaInitialized,
            this._OnceClientAreaInitialized
        );
    }

    protected _AddIpcListeners(): void {
        IpcRenderer.On(WindowChannels.MainWindow.WindowResized, this._OnWindowResized);
    }

    protected _RemoveIpcListeners(): void {
        IpcRenderer.RemoveListener(WindowChannels.MainWindow.WindowResized, this._OnWindowResized);
    }

    protected _SendIpcMessage(): void {
        IpcRenderer.Send(WindowChannels.MainWindow.ClientAreaInitialized);
    }

    // ---------------------------------------------------------------------------------- Ipc Events

    protected _OnceClientAreaInitialized = (event: any, clientAreaSize: Size): void => {
        console.log(clientAreaSize);
        this.setState({ clientAreaSize: clientAreaSize });
    };

    protected _OnWindowResized = (event: any, clientAreaSize: Size): void => {
        console.log(clientAreaSize);
        this.setState({ clientAreaSize: clientAreaSize });
    };
}

export { ClientArea as ReactAppClientArea };
