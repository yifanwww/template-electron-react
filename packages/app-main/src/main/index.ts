import { WindowType } from '@ter/app-common/apis/app';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import type { Extension } from 'electron';
import { app, BrowserWindow } from 'electron';

import { registerAppGlobalHandlers } from './apis/app';
import { AppInfo } from './appInfo';
import { AppLoggerService } from './logger';
import { WindowManager } from './window';

async function installExtensions(): Promise<void> {
    const {
        default: install,
        REDUX_DEVTOOLS,
        REACT_DEVELOPER_TOOLS,
    } = await import(/* webpackChunkName: 'electron-devtools-installer' */ 'electron-devtools-installer');

    const succeed = (name: Extension) => {
        AppLoggerService.INSTANCE.info(`Added extension "${name.name}"`);
    };

    const fail = (err: unknown) => {
        AppLoggerService.INSTANCE.error('An error occurred when install extension:', err);
    };

    await Promise.all([
        install(REDUX_DEVTOOLS).then(succeed).catch(fail),
        install(REACT_DEVELOPER_TOOLS).then(succeed).catch(fail),
    ]);
}

function initThirdPartyModules() {
    dayjs.extend(utc);
}

async function handleReady() {
    AppInfo.init();
    initThirdPartyModules();

    AppLoggerService.INSTANCE.info('App ready.');

    if (process.env.NODE_ENV === 'development') {
        await installExtensions();
    }

    registerAppGlobalHandlers();

    AppLoggerService.INSTANCE.info('Registered event handlers.');

    WindowManager.INSTANCE.createWindow({ type: WindowType.MAIN });
}

// This method will be called when Electron has finished initialization and is ready to create browser windows.
app.on('ready', () => {
    void handleReady();
});

app.on('window-all-closed', () => {
    // On macOS, most applications and their menu bars will stay active unless users use `cmd + Q` to quit.
    if (process.platform !== 'darwin') {
        app.quit();
        AppLoggerService.INSTANCE.info('App quited.');
    }
});

app.on('activate', () => {
    // On macOS, usually applications will re-create new windows if single click the dock icon when no other windows
    // opened.
    if (BrowserWindow.getAllWindows().length === 0) {
        WindowManager.INSTANCE.createWindow({ type: WindowType.MAIN });
    }
});
