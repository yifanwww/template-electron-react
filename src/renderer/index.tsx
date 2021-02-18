import { ReactElement, StrictMode } from 'react';
import ReactDOM from 'react-dom';

import { WindowType } from '#shared/WindowType';
import { windowIpc } from '#RUtils/Ipc';
import './index.css';

import * as serviceWorker from './serviceWorker';
import { MainClientArea } from './Main';

function CreateClientArea(): ReactElement {
    const windowType: WindowType = windowIpc.getWindowType();

    let clientArea: ReactElement;
    switch (windowType) {
        case WindowType.main:
            clientArea = <MainClientArea />;
            break;

        default:
            clientArea = <MainClientArea />;
    }

    return clientArea;
}

ReactDOM.render(
    <StrictMode>
        <CreateClientArea />
    </StrictMode>,
    document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change unregister() to register() below. Note this
// comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
