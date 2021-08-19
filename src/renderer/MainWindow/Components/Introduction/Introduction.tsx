import { keyframes, makeStyles } from '@fluentui/react';
import { ReactElement } from 'react';

import logo from './logo.svg';

const useStyles = makeStyles(() => {
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
    const classes = useStyles();

    return (
        <header className={classes.introduction}>
            <img className={classes.logo} src={logo} alt="logo" />
            <p>
                Edit <code>src/renderer/MainWindow/Components/Introduction/Introduction.tsx</code> and save to reload.
            </p>
            <a
                className={classes.link}
                href="https://github.com/YSoftwareRepo/template-electron-cra"
                target="_blank"
                rel="noopener noreferrer"
            >
                Learn template-electron-cra
            </a>
        </header>
    );
}
