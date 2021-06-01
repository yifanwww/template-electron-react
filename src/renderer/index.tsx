import { initializeIcons, ThemeProvider } from '@fluentui/react';
import { ReactElement, StrictMode } from 'react';
import { render } from 'react-dom';

import { WindowType } from '#shared/WindowType';
import { windowIpc } from '#RUtils/Ipc';
import { fluentuiTheme } from '#RUtils/Theme';

import { MainWindow } from './MainWindow';
import { reportWebVitals } from './reportWebVitals';

import './index.css';

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

render(
    <StrictMode>
        <ThemeProvider id="ThemeProvider" theme={fluentuiTheme}>
            <WindowProvider />
        </ThemeProvider>
    </StrictMode>,
    document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function to log results
// (for example: reportWebVitals (console.log)) or send to an analytics endpoint.
// Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
