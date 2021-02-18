import { ReactElement, StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { initializeIcons, ThemeProvider } from '@fluentui/react';

import { WindowType } from '#shared/WindowType';
import { windowIpc } from '#RUtils/Ipc';
import { fluentuiTheme } from '#RUtils/Theme';

import { MainClientArea } from './Main';

import './index.css';
import * as serviceWorker from './serviceWorker';

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

initializeIcons();

ReactDOM.render(
    <StrictMode>
        <ThemeProvider id="root" theme={fluentuiTheme}>
            <CreateClientArea />
        </ThemeProvider>
    </StrictMode>,
    document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change unregister() to register() below. Note this
// comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
