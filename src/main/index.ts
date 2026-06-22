import type { Extension } from 'electron';
import { app, BrowserWindow } from 'electron';

import './dayjs';

import { registerAppGlobalHandlers } from './apis/app';
import { globalLogger } from './logger';
import { MainWindow } from './window';

process.on('uncaughtException', (error: Error) => {
  globalLogger.fatal('Uncaught exception', error);
  // The process is in an unknown state; exiting is the safest choice.
  // Electron may show a native error dialog before exit.
  app.exit(1);
});

process.on('unhandledRejection', (reason: unknown) => {
  globalLogger.error('Unhandled promise rejection', reason);
  // We do NOT exit — unhandled rejections don't necessarily corrupt process state the way uncaught exceptions do.
});

async function installExtensions(): Promise<void> {
  const { installExtension, REACT_DEVELOPER_TOOLS } = await import('electron-devtools-installer');

  const succeed = (name: Extension) => {
    globalLogger.info(`Added extension "${name.name}"`);
  };

  const fail = (err: unknown) => {
    globalLogger.error('An error occurred when install extension:', err);
  };

  await installExtension(REACT_DEVELOPER_TOOLS).then(succeed).catch(fail);
}

async function handleReady() {
  if (process.env.NODE_ENV === 'development') {
    await installExtensions();
  }
  globalLogger.info('App ready.');

  registerAppGlobalHandlers();
  globalLogger.info('Registered event handlers.');

  const main = new MainWindow();
  main.initApplicationMenu();
  void main.show();
}

// This method will be called when Electron has finished initialization and is ready to create browser windows.
app.on('ready', () => {
  void handleReady();
});

app.on('window-all-closed', () => {
  // On macOS, most applications and their menu bars will stay active unless users use `cmd + Q` to quit.
  if (process.platform !== 'darwin') {
    app.quit();
    globalLogger.info('App quited.');
  }
});

app.on('activate', () => {
  // On macOS, usually applications will re-create new windows if single click the dock icon when no other windows
  // opened.
  if (BrowserWindow.getAllWindows().length === 0) {
    const main = new MainWindow();
    main.initApplicationMenu();
    void main.show();
  }
});

let quitting = false;

// eslint-disable-next-line @typescript-eslint/no-misused-promises
app.on('before-quit', async (event) => {
  if (quitting) return;

  event.preventDefault();
  quitting = true;
  globalLogger.info('App is quitting.');

  try {
    await globalLogger.close();
  } catch {
    // Winston may already be shutting down, so we just do nothing here.
  } finally {
    app.exit(0);
  }
});
