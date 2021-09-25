import { initializeIcons } from '@fluentui/react';
import { IpcChannels, WindowType } from '@tecra/electron-common';
import { ReactElement, StrictMode } from 'react';
import { render } from 'react-dom';

import { IpcRendererWrapper } from '#RUtils/IpcRenderer';

import { MainWindow } from './MainWindow';
import { reportWebVitals } from './report-web-vitals';

import './index.css';

function Window(): Optional<ReactElement> {
    const type: WindowType = IpcRendererWrapper.sendSync(IpcChannels.GetWindowType);

    let never: never;
    switch (type) {
        case 'main':
            return <MainWindow />;

        default:
            never = type;
            console.error(`Wrong window type '${never}' to create the specified window user interface.`);
            return null;
    }
}

function main(): void {
    initializeIcons();

    render(
        <StrictMode>
            <Window />
        </StrictMode>,
        document.getElementById('root'),
    );

    // If you want to start measuring performance in your app, pass a function to log results
    // (for example: reportWebVitals (console.log)) or send to an analytics endpoint.
    // Learn more: https://bit.ly/CRA-vitals
    reportWebVitals(console.log);
}

main();
