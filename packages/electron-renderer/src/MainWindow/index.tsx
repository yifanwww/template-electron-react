import { IpcClient } from '@tecra/electron-common';
import { FluentuiProvider } from '@tecra/utils-fluentui';
import { useEffect } from 'react';
import { Provider as ReduxProvider } from 'react-redux';

import { FramelessWindow, TitleBar } from 'src/utils/frameless';

import { ClientArea } from './containers/ClientArea';
import { mainActions, mainStore } from './redux';

const changeClientAreaSize = (size: IClientAreaSize) => mainStore.dispatch(mainActions.updateClientAreaSize(size));

export function MainWindow(): React.ReactElement {
    useEffect(() => {
        IpcClient.getAppDetails().then(console.info);
    }, []);

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
