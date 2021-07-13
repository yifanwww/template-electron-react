import { keyframes, makeStyles } from '@fluentui/react';
import { ReactElement } from 'react';

import logo from './logo.svg';

const useClassNames = makeStyles(() => {
    const _keyframes = keyframes({
        from: { transform: 'rotate(0deg)' },
        to: { transform: 'rotate(360deg)' },
    });

    return {
        introduction: {
            alignItems: 'center',
            background: '#282c34',
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
            fontSize: 'calc(10px + 2vmin)',
            justifyContent: 'center',
            minHeight: '100vh',
        },
        link: {
            color: '#61dafb',
        },
        logo: {
            height: '40vmin',
            pointerEvents: 'none',

            '@media (prefers-reduced-motion: no-preference)': {
                animation: `${_keyframes} infinite 20s linear`,
            },
        },
    };
});

export function Introduction(): ReactElement {
    const classNames = useClassNames();

    return (
        <header className={classNames.introduction}>
            <img className={classNames.logo} src={logo} alt="logo" />
            <p>
                Edit <code>src/renderer/MainWindow/App.tsx</code> and save to reload.
            </p>
            <a
                className={classNames.link}
                href="https://github.com/YSoftwareRepo/template-electron-cra"
                target="_blank"
                rel="noopener noreferrer"
            >
                Learn @YSoftwareRepo/template-electron-cra
            </a>
        </header>
    );
}
