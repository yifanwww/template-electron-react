import React from 'react';
import { Provider, useDispatch } from 'react-redux';

import { AbstractClientArea } from '#ClientArea';
import { ClientAreaSize } from '#shared/ClientAreaSize.types';

import { Store } from './Store';
import { Actions } from './Slice';
import { App } from './App';

function ProviderMiddle(props: { clientAreaSize: ClientAreaSize }) {
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
                <ProviderMiddle clientAreaSize={this.state.clientAreaSize} />
            </Provider>
        );
    }

    // ---------------------------------------------------------------------------------- Ipc Events

    protected onceClientAreaInitialized(event: any, clientAreaSize: ClientAreaSize): void {
        this.setState({ clientAreaSize });
    }

    protected onWindowResized(event: any, clientAreaSize: ClientAreaSize): void {
        this.setState({ clientAreaSize });
    }
}
