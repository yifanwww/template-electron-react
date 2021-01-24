import { app, BrowserWindow } from 'electron';

import { WindowType } from '#shared/WindowType';

import { createWindow } from './Window';

// This method will be called when Electron has finished initialization and is ready to create
// browser windows.
app.on('ready', () => {
    if (process.env.NODE_ENV === 'production') {
        console.info('No extensions will be installed.');
    } else {
        /* eslint-disable global-require */
        const {
            default: installExtensions,
            REDUX_DEVTOOLS,
            REACT_DEVELOPER_TOOLS,
        } = require('electron-devtools-installer');
        /* eslint-enable global-require */

        installExtensions([REDUX_DEVTOOLS, REACT_DEVELOPER_TOOLS])
            .then((name: string) => console.info(`Added extensions: ${name}`))
            .catch((err: any) => console.error('An error occurred: ', err));
    }

    createWindow(WindowType.main);
});

app.on('window-all-closed', () => {
    // On macOS, most applications and their menu bars will key activated unless users use
    // `cmd + Q` to quit.
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // On macOS, usually applications will re-create new windows if single click the dock icon when
    // no other windows opened.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow(WindowType.main);
    }
});
