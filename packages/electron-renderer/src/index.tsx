import { WindowType } from '@tecra/electron-common';
import { StrictMode, useEffect, useState } from 'react';
import { render } from 'react-dom';

import './index.css';

import { appAPI } from './apis';
import { MainWindow } from './MainWindow';
import { reportWebVitals } from './reportWebVitals';

const Window: React.FC = () => {
    const [type, setType] = useState<WindowType | null>(null);

    useEffect(() => {
        void appAPI.getWindowType().then(setType);
    }, []);

    switch (type) {
        case WindowType.MAIN:
            return <MainWindow />;
        case null:
            return <div />;

        /* istanbul ignore next */
        default: {
            const never: never = type;
            // eslint-disable-next-line no-console
            console.error(`Wrong window type '${String(never)}' to create the specified window user interface.`);
            return null;
        }
    }
};

function main(): void {
    render(
        <StrictMode>
            <Window />
        </StrictMode>,
        document.getElementById('root'),
    );

    // If you want to start measuring performance in your app, pass a function to log results
    // (for example: reportWebVitals (console.log)) or send to an analytics endpoint.
    // Learn more: https://bit.ly/CRA-vitals
    // eslint-disable-next-line no-console
    reportWebVitals(console.info);
}

main();
