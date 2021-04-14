import { ReactElement, useCallback } from 'react';
import { Provider } from 'react-redux';

import { ClientAreaSizeProvider, IClientAreaSizeProviderProps } from '#RUtils/ClientArea';

import { mainActions, mainStore } from './Redux';
import { RootLayout } from './Containers/RootLayout';

export function MainClientArea(): ReactElement {
    const onClientAreaSizeChange = useCallback<NonNullable<IClientAreaSizeProviderProps['onClientAreaSizeChange']>>(
        (clientAreaSize) => mainStore.dispatch(mainActions.updateClientAreaSize(clientAreaSize)),
        [],
    );

    return (
        <Provider store={mainStore}>
            <ClientAreaSizeProvider onClientAreaSizeChange={onClientAreaSizeChange}>
                <RootLayout />
            </ClientAreaSizeProvider>
        </Provider>
    );
}
