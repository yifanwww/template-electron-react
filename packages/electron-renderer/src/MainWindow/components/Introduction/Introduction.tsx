import Assets from '@tecra/assets';
import { AppDetails } from '@tecra/electron-common';

import scss from './Introduction.module.scss';

export interface IntroductionProps {
    appDetails: AppDetails;
}

export const Introduction: React.FC<IntroductionProps> = ({ appDetails }) => (
    <>
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
        <div className={scss.appDetails}>
            <code>Name: {appDetails.name}</code>
            <code>Version: {appDetails.version}</code>
            <code>Electron: {appDetails.module.electron}</code>
            <code>Chrome: {appDetails.module.chrome}</code>
            <code>Node.js: {appDetails.module.node}</code>
            <code>V8: {appDetails.module.v8}</code>
        </div>
    </>
);
