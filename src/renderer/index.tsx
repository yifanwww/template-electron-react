import { initializeIcons, ThemeProvider } from '@fluentui/react';
import { ReactElement, StrictMode } from 'react';
import { render } from 'react-dom';

import { Optional } from '#Common/TypeUtils';
import { WindowType } from '#Common/WindowType';
import { rendererIpc } from '#RUtils/RendererIpc';
import { fluentuiTheme } from '#RUtils/Theme';

import { MainWindow } from './MainWindow';
import { reportWebVitals } from './reportWebVitals';

import './index.css';

function initializeFluentui(): void {
    initializeIcons();
}

function WindowProvider(): Optional<ReactElement> {
    const windowType: WindowType = rendererIpc.getWindowType();

    let never: never;
    switch (windowType) {
        case 'main':
            return <MainWindow />;

        default:
            never = windowType;
            console.error(`Wrong window type '${never}' to create the specified window user interface.`);
            return null;
    }
}

function main(): void {
    initializeFluentui();

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
}

main();
