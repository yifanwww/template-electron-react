import { ReactElement, useCallback } from 'react';
import { Provider } from 'react-redux';

import { ClientAreaProvider, IClientAreaProviderProps } from '#RUtils/ClientArea';

import { mainActions, mainStore } from './Redux';
import { RootLayout } from './Containers/RootLayout';

export function MainClientArea(): ReactElement {
    const onClientAreaSizeChange = useCallback<NonNullable<IClientAreaProviderProps['onClientAreaSizeChange']>>(
        (clientAreaSize) => mainStore.dispatch(mainActions.updateClientAreaSize(clientAreaSize)),
        [],
    );

    return (
        <Provider store={mainStore}>
            <ClientAreaProvider onClientAreaSizeChange={onClientAreaSizeChange}>
                <RootLayout />
            </ClientAreaProvider>
        </Provider>
    );
}
