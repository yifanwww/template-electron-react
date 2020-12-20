import React, { ReactElement, useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';

import { ClientAreaSize } from '#RendererUtils/Types';
import { AbstractClientArea } from '#ClientArea';

import { actions, store } from './redux';
import { App } from './App';

interface IStoreUpdaterProps {
    clientAreaSize: ClientAreaSize;
}

function StoreUpdater(props: Readonly<IStoreUpdaterProps>) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(actions.updateClientAreaSize(props.clientAreaSize));
    });

    return <App />;
}

interface IReactAppClientAreaState {
    clientAreaSize: ClientAreaSize;
}

export class ReactAppClientArea extends AbstractClientArea<{}, IReactAppClientAreaState> {
    public constructor(props: Readonly<{}>) {
        super(props);

        this.state = {
            clientAreaSize: { width: 1280, height: 720 },
        };
    }

    // ------------------------------------------------------------------------------ ReactLifeCycle

    public render(): ReactElement {
        return (
            <Provider store={store}>
                <StoreUpdater clientAreaSize={this.state.clientAreaSize} />
            </Provider>
        );
    }

    // ----------------------------------------------------------------------------- Window Handlers

    protected onceClientAreaInitialized(clientAreaSize: ClientAreaSize): void {
        this.setState({ clientAreaSize });

        console.log(`clientarea-initialized: ${JSON.stringify(clientAreaSize)}`);
    }

    protected onWindowResized(event: any, clientAreaSize: ClientAreaSize): void {
        this.setState({ clientAreaSize });

        console.log(`window-resized: ${JSON.stringify(clientAreaSize)}`);
    }
}
