import { ReactElement } from 'react';

import logo from './logo.svg';
import scss from './InfoDisplay.module.scss';

export function InfoDisplay(): ReactElement {
    return (
        <header className={scss.Header}>
            <img src={logo} className={scss.Logo} alt="logo" />
            <p>
                Edit <code>src/renderer/MainWindow/App.tsx</code> and save to reload.
            </p>
            <a
                className={scss.Link}
                href="https://github.com/YSoftwareRepo/template-electron-cra"
                target="_blank"
                rel="noopener noreferrer"
            >
                Learn @YSoftwareRepo/template-electron-cra
            </a>
        </header>
    );
}
