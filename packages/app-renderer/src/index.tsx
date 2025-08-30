import { WindowType } from '@app/common/apis/app';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';

import { WINDOW_TYPE } from './apis';
import { MainWindow } from './MainWindow';
import { reportWebVitals } from './reportWebVitals';
import { assert, assertIsNever } from './utils/assert';

function renderWindow() {
    switch (WINDOW_TYPE) {
        case WindowType.MAIN:
            return <MainWindow />;
        default:
            assertIsNever(WINDOW_TYPE);
    }
}

function main(): void {
    const appElement = document.getElementById('app');
    assert(appElement !== null);

    const root = createRoot(appElement);
    root.render(<StrictMode>{renderWindow()}</StrictMode>);

    // If you want to start measuring performance in your app, pass a function to log results
    // (for example: reportWebVitals (console.log)) or send to an analytics endpoint.
    // Learn more: https://bit.ly/CRA-vitals
    // eslint-disable-next-line no-console
    reportWebVitals(console.info);
}

main();
