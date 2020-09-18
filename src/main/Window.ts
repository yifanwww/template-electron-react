import path from 'path';
import { BrowserWindow, ipcMain, IpcMainEvent } from 'electron';

let window: BrowserWindow | null;

export async function CreateWindow(): Promise<void> {
    let width = 1280;
    let height = 720;

    window = new BrowserWindow({
        width: width,
        height: height,
        webPreferences: {
            enableRemoteModule: true,
            nodeIntegration: true,
        },
    });

    const isDevMode = process.env.mode === 'development' ? true : false;

    AddWindowListeners();
    AddIpcMainListeners();

    if (!isDevMode) {
        await window.loadFile(path.join(__dirname, 'index.html'));
    } else {
        await window.loadURL('http://localhost:3000/');
        // window.webContents.openDevTools();
    }

    window.show();
}

function AddWindowListeners(): void {
    window!.on('show', () => {});

    window!.on('resize', () => {
        OnWindowResized();
    });

    window!.once('closed', () => {
        window = null;

        RemoveIpcMainListeners();
    });
}

function OnWindowResized() {
    let size = window!.getContentSize();
    window!.webContents.send('WindowResized', { width: size[0], height: size[1] });
}

function AddIpcMainListeners(): void {
    ipcMain.on('ClientAreaInitialized', OnClientAreaInitialized);
}

function RemoveIpcMainListeners(): void {
    ipcMain.removeListener('ClientAreaInitialized', OnClientAreaInitialized);
}

function OnClientAreaInitialized(event: IpcMainEvent) {
    let size = window!.getContentSize();
    event.reply('ClientAreaInitialized', { width: size[0], height: size[1] });
}
