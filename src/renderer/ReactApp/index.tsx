import React, { ReactElement } from 'react';
import { Provider } from 'react-redux';

import { ClientAreaSize } from '#RendererUtils/Types';
import { AbstractClientArea } from '#ClientArea';

import { actions, sdispatch, store } from './redux';
import { App } from './App';

export class ReactAppClientArea extends AbstractClientArea {
    // ------------------------------------------------------------------------------ ReactLifeCycle

    public render(): ReactElement {
        return (
            <Provider store={store}>
                <App />
            </Provider>
        );
    }

    // ----------------------------------------------------------------------------- Window Handlers

    protected onceClientAreaInitialized(clientAreaSize: ClientAreaSize): void {
        sdispatch(actions.updateClientAreaSize(clientAreaSize));

        console.log('clientarea-initialized.');
    }

    protected onWindowResized(event: any, clientAreaSize: ClientAreaSize): void {
        sdispatch(actions.updateClientAreaSize(clientAreaSize));

        console.log('window-resized.');
    }
}
