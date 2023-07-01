import type { AppDetails } from '@tecra/app-common';

import { Assets } from 'src/assets';

import css from './Introduction.module.scss';

interface IntroductionProps {
    appDetails: AppDetails | null;
}

export function Introduction({ appDetails }: IntroductionProps): JSX.Element {
    return (
        <>
            <header className={css.introduction}>
                <img className={css.logo} src={Assets.logo} alt="logo" />
                <p>
                    Edit <code>src/MainWindow/components/Introduction/Introduction.tsx</code> and save to reload.
                </p>
                <a
                    className={css.link}
                    href="https://github.com/YSoftwareRepo/template-electron-cra"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn template-electron-cra
                </a>
            </header>
            {appDetails && (
                <div className={css.appDetails}>
                    <code>Name: {appDetails.name}</code>
                    <code>Version: {appDetails.version}</code>
                    <code>Electron: {appDetails.module.electron}</code>
                    <code>Chrome: {appDetails.module.chrome}</code>
                    <code>Node.js: {appDetails.module.node}</code>
                    <code>V8: {appDetails.module.v8}</code>
                </div>
            )}
        </>
    );
}
