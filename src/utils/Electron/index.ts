import { IpcRendererWrapper } from './IpcRendererWrapper';

let _ipc: Electron.IpcRenderer | undefined;

try {
    let { ipcRenderer } = window.require('electron');
    _ipc = ipcRenderer;
} catch (error) {
    console.error(error.message);
}

export const IpcRenderer = new IpcRendererWrapper(_ipc);
