import React from 'react';
import { Provider, useDispatch } from 'react-redux';

import { AbstractClientArea } from '#ClientArea';
import { ClientAreaSize } from '#shared/ClientAreaSize.types';

import { Store } from './Store';
import { Actions } from './Slice';
import { App } from './App';

interface StoreUpdaterProps {
    clientAreaSize: ClientAreaSize;
}

function StoreUpdater(props: Readonly<StoreUpdaterProps>) {
    const dispatch = useDispatch();

    dispatch(Actions.updateClientAreaSize(props.clientAreaSize));

    return <App />;
}

interface ClientAreaState {
    clientAreaSize: ClientAreaSize;
}

export class ReactAppClientArea extends AbstractClientArea<{}, ClientAreaState> {
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
                <StoreUpdater clientAreaSize={this.state.clientAreaSize} />
            </Provider>
        );
    }

    // ---------------------------------------------------------------------------------- Ipc Events

    protected onceClientAreaInitialized(event: any, clientAreaSize: ClientAreaSize): void {
        this.setState({ clientAreaSize });

        console.log(`clientarea-initialized: ${JSON.stringify(clientAreaSize)}`);
    }

    protected onWindowResized(event: any, clientAreaSize: ClientAreaSize): void {
        this.setState({ clientAreaSize });

        console.log(`window-resized: ${JSON.stringify(clientAreaSize)}`);
    }
}
