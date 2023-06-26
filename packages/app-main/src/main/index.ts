import { WindowType } from '@tecra/app-common';
import { app, BrowserWindow } from 'electron';

import { registerAppGlobalHandlers } from './apis/app';
import { windowManager } from './window';

async function installExtensions(): Promise<void> {
    const {
        default: install,
        REDUX_DEVTOOLS,
        REACT_DEVELOPER_TOOLS,
    } = await import(/* webpackChunkName: 'electron-devtools-installer' */ 'electron-devtools-installer');

    // eslint-disable-next-line no-console
    const succeed = (name: string) => console.info(`Added extension: ${name}`);
    // eslint-disable-next-line no-console
    const fail = (err: unknown) => console.error('An error occurred: ', err);

    await Promise.all([
        install(REDUX_DEVTOOLS).then(succeed).catch(fail),
        install(REACT_DEVELOPER_TOOLS).then(succeed).catch(fail),
    ]);
}

async function handleReady() {
    if (process.env.NODE_ENV === 'development') {
        await installExtensions();
    }

    registerAppGlobalHandlers();

    windowManager.createWindow({ windowType: WindowType.MAIN });
}

// This method will be called when Electron has finished initialization and is ready to create browser windows.
app.on('ready', () => {
    void handleReady();
});

app.on('window-all-closed', () => {
    // On macOS, most applications and their menu bars will key activated unless users use `cmd + Q` to quit.
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // On macOS, usually applications will re-create new windows if single click the dock icon when no other windows
    // opened.
    if (BrowserWindow.getAllWindows().length === 0) {
        windowManager.createWindow({ windowType: WindowType.MAIN });
    }
});
