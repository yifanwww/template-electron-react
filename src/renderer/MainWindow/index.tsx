import { ReactElement } from 'react';
import { Provider as ReduxProvider } from 'react-redux';

import { FluentuiProvider } from '#RUtils/Fluentui';
import { FramelessWindow, TitleBar } from '#RUtils/Frameless';

import { mainActions, mainStore } from './Redux';
import { ClientArea } from './Containers/ClientArea';

const changeClientAreaSize = (size: IClientAreaSize) => mainStore.dispatch(mainActions.updateClientAreaSize(size));

export function MainWindow(): ReactElement {
    return (
        <FramelessWindow>
            <TitleBar onClientAreaSizeChange={changeClientAreaSize}>
                <FluentuiProvider>
                    <ReduxProvider store={mainStore}>
                        <ClientArea />
                    </ReduxProvider>
                </FluentuiProvider>
            </TitleBar>
        </FramelessWindow>
    );
}
