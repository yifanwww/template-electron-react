import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

import './index.css';
import { WindowChannels, WindowType } from '@Utils/Window';
import { IpcRenderer } from '@Electron';

import { ReactAppClientArea } from './ReactApp';

function CreateClientArea(): JSX.Element {
    const windowType: WindowType = IpcRenderer.SendSync(WindowChannels.Common.WindowType);

    let clientArea: JSX.Element;
    switch (windowType) {
        case WindowType.MainWindow:
            clientArea = <ReactAppClientArea />;
            break;

        default:
            clientArea = <ReactAppClientArea />;
    }

    return clientArea;
}

ReactDOM.render(
    <React.StrictMode>
        <CreateClientArea />
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change unregister() to register()
// below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
