import { FluentuiProvider } from '@tecra/utils-fluentui';
import { ReactElement } from 'react';
import { Provider as ReduxProvider } from 'react-redux';

import { FramelessWindow, TitleBar } from 'src/utils/frameless';

import { mainActions, mainStore } from './redux';
import { ClientArea } from './containers/ClientArea';

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
