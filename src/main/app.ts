import { app, BrowserWindow } from 'electron';

import { WindowType } from '#shared/WindowType';

import { createWindow } from './Window';

async function installExtensions(): Promise<void> {
    /* eslint-disable global-require */
    const {
        default: installExtension,
        REDUX_DEVTOOLS,
        REACT_DEVELOPER_TOOLS,
    } = require('electron-devtools-installer') as typeof import('electron-devtools-installer');
    /* eslint-enable global-require */

    const succeed = (name: string) => console.info(`Added extension: ${name}`);
    const fail = (err: any) => console.error('An error occurred: ', err);

    await Promise.all([
        installExtension(REDUX_DEVTOOLS).then(succeed).catch(fail),
        installExtension(REACT_DEVELOPER_TOOLS).then(succeed).catch(fail),
    ]);
}

// This method will be called when Electron has finished initialization and is ready to create
// browser windows.
app.on('ready', async () => {
    if (process.env.NODE_ENV === 'development') {
        await installExtensions();
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
