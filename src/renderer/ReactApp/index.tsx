import React from 'react';
import { Provider } from 'react-redux';

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
        super(props, WindowChannels.MainWindow);

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

    // ---------------------------------------------------------------------------------- Ipc Events

    protected _OnceClientAreaInitialized(event: any, clientAreaSize: Size): void {
        console.log(clientAreaSize);
        this.setState({ clientAreaSize: clientAreaSize });
    }

    protected _OnWindowResized(event: any, clientAreaSize: Size): void {
        console.log(clientAreaSize);
        this.setState({ clientAreaSize: clientAreaSize });
    }
}

export { ClientArea as ReactAppClientArea };
