import _fs from 'fs';
import _path from 'path';
import { ReactElement } from 'react';
import { Provider } from 'react-redux';

import { ClientAreaSize } from '#RUtils/Types';
import { AbstractClientArea } from '#RUtils/ClientArea';

import { mainActions, mainStore } from './redux';
import { App } from './App';

export class MainClientArea extends AbstractClientArea {
    // ------------------------------------------------------------------------------ ReactLifeCycle

    public render(): ReactElement {
        return (
            <Provider store={mainStore}>
                <App />
            </Provider>
        );
    }

    public componentDidMount() {
        // Please delete these code in your own application.

        super.componentDidMount();

        const cwd = process.cwd();
        console.log(cwd);
        _fs.promises
            .readdir(_path.join(cwd, '..'))
            .then((res) => console.log(res))
            .catch(() => undefined);
    }

    // ----------------------------------------------------------------------------- Window Handlers

    protected onceClientAreaInitialized(clientAreaSize: ClientAreaSize): void {
        mainStore.dispatch(mainActions.updateClientAreaSize(clientAreaSize));

        console.log('clientarea-initialized.');
    }

    protected onWindowResized(event: any, clientAreaSize: ClientAreaSize): void {
        mainStore.dispatch(mainActions.updateClientAreaSize(clientAreaSize));

        console.log('window-resized.');
    }
}
