import { initializeIcons } from '@fluentui/react';
import { IpcClient, WindowType } from '@tecra/electron-common';
import { StrictMode, useEffect, useState } from 'react';
import { render } from 'react-dom';

import './index.css';

import { MainWindow } from './MainWindow';
import { reportWebVitals } from './reportWebVitals';

function Window(): Optional<React.ReactElement> {
    const [type, setType] = useState<Optional<WindowType>>(null);

    useEffect(() => {
        IpcClient.getWindowType().then(setType);
    }, []);

    let never: never;
    switch (type) {
        case 'main':
            return <MainWindow />;
        case null:
            return <div />;

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
