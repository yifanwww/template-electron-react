import { app, BrowserWindow } from 'electron';

import { WindowManager } from './WindowManager';

const windowManager = new WindowManager();

async function installExtensions(): Promise<void> {
    const {
        default: installExtension,
        REDUX_DEVTOOLS,
        REACT_DEVELOPER_TOOLS,
    } = await import('electron-devtools-installer');

    const succeed = (name: string) => console.info(`Added extension: ${name}`);
    const fail = (err: any) => console.error('An error occurred: ', err);

    await Promise.all([
        installExtension(REDUX_DEVTOOLS).then(succeed).catch(fail),
        installExtension(REACT_DEVELOPER_TOOLS).then(succeed).catch(fail),
    ]);
}

// This method will be called when Electron has finished initialization and is ready to create browser windows.
app.on('ready', async () => {
    if (process.env.NODE_ENV === 'development') {
        await installExtensions();
    }

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
