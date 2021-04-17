import { ReactElement, useCallback } from 'react';
import { Provider } from 'react-redux';

import { FramelessWindow, ITitleBarProps, TitleBar } from '#RUtils/FramelessWindow';

import { mainActions, mainStore } from './Redux';
import { ClientArea } from './Containers/ClientArea';

export function MainClientArea(): ReactElement {
    const onClientAreaSizeChange = useCallback<NonNullable<ITitleBarProps['onClientAreaSizeChange']>>(
        (clientAreaSize) => mainStore.dispatch(mainActions.updateClientAreaSize(clientAreaSize)),
        [],
    );

    return (
        <Provider store={mainStore}>
            <FramelessWindow>
                <TitleBar onClientAreaSizeChange={onClientAreaSizeChange}>
                    <ClientArea />
                </TitleBar>
            </FramelessWindow>
        </Provider>
    );
}
