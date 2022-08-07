import { app, BrowserWindow } from 'electron';

import { registerIpcGlobalListeners } from './ipc';
import { windowManager } from './window';

async function installExtensions(): Promise<void> {
    const { default: install, REDUX_DEVTOOLS, REACT_DEVELOPER_TOOLS } = await import('electron-devtools-installer');

    // eslint-disable-next-line no-console
    const succeed = (name: string) => console.info(`Added extension: ${name}`);
    // eslint-disable-next-line no-console
    const fail = (err: unknown) => console.error('An error occurred: ', err);

    await Promise.all([
        install(REDUX_DEVTOOLS).then(succeed).catch(fail),
        install(REACT_DEVELOPER_TOOLS).then(succeed).catch(fail),
    ]);
}

// This method will be called when Electron has finished initialization and is ready to create browser windows.
app.on('ready', async () => {
    if (process.env.NODE_ENV === 'development') {
        await installExtensions();
    }

    registerIpcGlobalListeners();

    windowManager.createWindow({ windowType: 'main' });
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
        windowManager.createWindow({ windowType: 'main' });
    }
});
