import { WindowType } from '@ter/app-common/apis/app';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';

import { appAPI } from './apis';
import { MainWindow } from './MainWindow';
import { reportWebVitals } from './reportWebVitals';
import { assert, assertIsNever } from './utils/assert';

function Window(): JSX.Element {
    const type = appAPI.windowType;

    switch (type) {
        case WindowType.MAIN:
            return <MainWindow />;

        default:
            assertIsNever(type);
    }
}

function main(): void {
    const appElement = document.getElementById('app');
    assert(appElement !== null);

    const root = createRoot(appElement);
    root.render(
        <StrictMode>
            <Window />
        </StrictMode>,
    );

    // If you want to start measuring performance in your app, pass a function to log results
    // (for example: reportWebVitals (console.log)) or send to an analytics endpoint.
    // Learn more: https://bit.ly/CRA-vitals
    // eslint-disable-next-line no-console
    reportWebVitals(console.info);
}

main();
