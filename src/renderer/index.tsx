import { ReactElement, StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { initializeIcons, ThemeProvider } from '@fluentui/react';

import { WindowType } from '#shared/WindowType';
import { windowIpc } from '#RUtils/Ipc';
import { fluentuiTheme } from '#RUtils/Theme';

import { MainWindow } from './MainWindow';

import './index.css';
import * as serviceWorker from './serviceWorker';

function WindowProvider(): ReactElement | null {
    const windowType: WindowType = windowIpc.getWindowType();

    let never: never;
    switch (windowType) {
        case 'main':
            return <MainWindow />;

        default:
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            never = windowType;
            return null;
    }
}

initializeIcons();

ReactDOM.render(
    <StrictMode>
        <ThemeProvider id="ThemeProvider" theme={fluentuiTheme}>
            <WindowProvider />
        </ThemeProvider>
    </StrictMode>,
    document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change unregister() to register() below. Note this
// comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
