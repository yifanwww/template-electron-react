import { ReactElement, useCallback } from 'react';
import { Provider } from 'react-redux';

import { FramelessWindow, ITitleBarProps, TitleBar } from '#RUtils/Frameless';

import { mainActions, mainStore } from './Redux';
import { ClientArea } from './Containers/ClientArea';

export function MainWindow(): ReactElement {
    const onClientAreaSizeChange = useCallback<NonNullable<ITitleBarProps['onClientAreaSizeChange']>>(
        (clientAreaSize) => mainStore.dispatch(mainActions.updateClientAreaSize(clientAreaSize)),
        [],
    );

    return (
        <FramelessWindow>
            <TitleBar onClientAreaSizeChange={onClientAreaSizeChange}>
                <Provider store={mainStore}>
                    <ClientArea />
                </Provider>
            </TitleBar>
        </FramelessWindow>
    );
}
