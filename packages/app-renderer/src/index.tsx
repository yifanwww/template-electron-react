import { WindowType } from '@ter/app-common/apis/app';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { match } from 'ts-pattern';

import './index.css';

import { AppAPI } from './apis';
import { MainWindow } from './MainWindow';
import { reportWebVitals } from './reportWebVitals';
import { assert } from './utils/assert';

function main(): void {
    const appElement = document.getElementById('app');
    assert(appElement !== null);

    const window = match(AppAPI.windowType)
        .with(WindowType.MAIN, () => <MainWindow />)
        .exhaustive();

    const root = createRoot(appElement);
    root.render(<StrictMode>{window}</StrictMode>);

    // If you want to start measuring performance in your app, pass a function to log results
    // (for example: reportWebVitals (console.log)) or send to an analytics endpoint.
    // Learn more: https://bit.ly/CRA-vitals
    // eslint-disable-next-line no-console
    reportWebVitals(console.info);
}

main();
