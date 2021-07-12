import { ReactElement } from 'react';
import { Provider } from 'react-redux';

import { FramelessWindow, TitleBar } from '#RUtils/Frameless';
import { IClientAreaSize } from '#RUtils/Types';

import { mainActions, mainStore } from './Redux';
import { ClientArea } from './Containers/ClientArea';

const changeClientAreaSize = (size: IClientAreaSize) => mainStore.dispatch(mainActions.updateClientAreaSize(size));

export function MainWindow(): ReactElement {
    return (
        <FramelessWindow>
            <TitleBar onClientAreaSizeChange={changeClientAreaSize}>
                <Provider store={mainStore}>
                    <ClientArea />
                </Provider>
            </TitleBar>
        </FramelessWindow>
    );
}
