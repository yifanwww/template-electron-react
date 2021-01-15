import _fs from 'fs';
import _path from 'path';
import { ReactElement } from 'react';
import { Provider } from 'react-redux';

import { ClientAreaSize } from '#RUtils/Types';
import { AbstractClientArea } from '#RUtils/ClientArea';

import { appActions, appDispatch, appStore } from './redux';
import { App } from './App';

export class AppClientArea extends AbstractClientArea {
    // ------------------------------------------------------------------------------ ReactLifeCycle

    public render(): ReactElement {
        return (
            <Provider store={appStore}>
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
        appDispatch(appActions.updateClientAreaSize(clientAreaSize));

        console.log('clientarea-initialized.');
    }

    protected onWindowResized(event: any, clientAreaSize: ClientAreaSize): void {
        appDispatch(appActions.updateClientAreaSize(clientAreaSize));

        console.log('window-resized.');
    }
}
