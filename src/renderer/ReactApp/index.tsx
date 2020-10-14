import React from 'react';
import { Provider } from 'react-redux';

import { AbstractClientArea } from '@ClientArea';
import { ClientAreaSize } from '@Electron';

import { App } from './App';
import { Store } from './Store';

interface ClientAreaState {
    clientAreaSize: ClientAreaSize;
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

    // ---------------------------------------------------------------------------------- Ipc Events

    protected OnceClientAreaInitialized(event: any, clientAreaSize: ClientAreaSize): void {
        console.log(clientAreaSize);
        this.setState({ clientAreaSize: clientAreaSize });
    }

    protected OnWindowResized(event: any, clientAreaSize: ClientAreaSize): void {
        console.log(clientAreaSize);
        this.setState({ clientAreaSize: clientAreaSize });
    }
}

export { ClientArea as ReactAppClientArea };
