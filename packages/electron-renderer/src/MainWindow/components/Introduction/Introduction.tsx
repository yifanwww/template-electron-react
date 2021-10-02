import { Assets } from '@tecra/assets';

import scss from './Introduction.module.scss';

export function Introduction(): React.ReactElement {
    return (
        <header className={scss.introduction}>
            <img className={scss.logo} src={Assets.logo} alt="logo" />
            <p>
                Edit <code>src/MainWindow/components/Introduction/Introduction.tsx</code> and save to reload.
            </p>
            <a
                className={scss.link}
                href="https://github.com/YSoftwareRepo/template-electron-cra"
                target="_blank"
                rel="noopener noreferrer"
            >
                Learn template-electron-cra
            </a>
        </header>
    );
}
