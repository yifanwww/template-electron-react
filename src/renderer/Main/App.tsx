import { ReactElement } from 'react';

import logo from './logo.svg';
import scss from './App.module.css';

export function App(): ReactElement {
    return (
        <div className={scss.App}>
            <header className={scss['App-header']}>
                <img src={logo} className={scss['App-logo']} alt="logo" />
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <a className={scss['App-link']} href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
                    Learn React
                </a>
            </header>
        </div>
    );
}
