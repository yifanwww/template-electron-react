import { ipcRenderer } from 'electron';

import { AppDetails, WindowType } from '../type';
import { IpcChannels } from './channels';

const ipcRendererFactory = {
    invoke: <Return, Args extends unknown[]>(channel: string) => {
        return (...args: Args) => ipcRenderer.invoke(channel, ...args) as Promise<Return>;
    },
};

export class IpcClient {
    static createWindow = ipcRendererFactory.invoke<void, [windowType: WindowType]>(IpcChannels.CreateWindow);
    static getAppDetails = ipcRendererFactory.invoke<AppDetails, []>(IpcChannels.GetAppDetails);
    static getWindowType = ipcRendererFactory.invoke<WindowType, []>(IpcChannels.GetWindowType);
}
