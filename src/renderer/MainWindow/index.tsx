import { ReactElement } from 'react';
import { Provider } from 'react-redux';

import { AbstractClientArea } from '#RUtils/ClientArea';
import { IClientAreaSize } from '#RUtils/GlobalTypes';

import { mainActions, mainStore } from './Redux';
import { RootLayout } from './Containers/RootLayout';

export class MainClientArea extends AbstractClientArea {
    // -------------------------------------------------------------------------------------------------- ReactLifeCycle

    public render(): ReactElement {
        return (
            <Provider store={mainStore}>
                <RootLayout />
            </Provider>
        );
    }

    // ------------------------------------------------------------------------------------------------- Window Handlers

    protected onceClientAreaInitialized(clientAreaSize: IClientAreaSize): void {
        mainStore.dispatch(mainActions.updateClientAreaSize(clientAreaSize));

        console.log('clientarea-initialized.');
    }

    protected onWindowResized(event: any, clientAreaSize: IClientAreaSize): void {
        mainStore.dispatch(mainActions.updateClientAreaSize(clientAreaSize));

        console.log('window-resized.');
    }
}
