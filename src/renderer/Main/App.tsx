import { ReactElement, useMemo } from 'react';
import { IStyle, keyframes, mergeStyleSets } from '@fluentui/react';

import { IStrictStyle } from '#RUtils/Fluentui';

import logo from './logo.svg';

interface TStyleSet {
    app: IStrictStyle;
    appHeader: IStrictStyle;
    appLink: IStrictStyle;
    appLogo: IStyle;
}

export function App(): ReactElement {
    const classNames = useMemo(() => {
        const appLogoKeyframes = keyframes({
            from: { transform: 'rotate(0deg)' },
            to: { transform: 'rotate(360deg)' },
        });

        return mergeStyleSets<TStyleSet>({
            app: {
                displayName: 'App',

                textAlign: 'center',
            },
            appHeader: {
                displayName: 'App-header',

                alignItems: 'center',
                backgroundColor: '#282c34',
                color: 'white',
                display: 'flex',
                flexDirection: 'column',
                fontSize: 'calc(10px + 2vmin)',
                justifyContent: 'center',
                minHeight: '100vh',
            },
            appLink: {
                displayName: 'App-link',

                color: '#61dafb',
            },
            appLogo: {
                displayName: 'App-logo',

                height: '40vmin',
                pointerEvents: 'none',

                '@media (prefers-reduced-motion: no-preference)': {
                    animation: `${appLogoKeyframes} infinite 20s linear`,
                },
            },
        });
    }, []);

    return (
        <div className={classNames.app}>
            <header className={classNames.appHeader}>
                <img src={logo} className={classNames.appLogo} alt="logo" />
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <a className={classNames.appLink} href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
                    Learn React
                </a>
            </header>
        </div>
    );
}
