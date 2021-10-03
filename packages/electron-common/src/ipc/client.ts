import { ipcRenderer } from 'electron';

import { IAppDetails, WindowType } from '../type';
import { IpcChannels } from './channels';

const ipcRendererFactory = {
    invoke: <Return extends unknown, Args extends unknown[]>(channel: string) => {
        return (...args: Args) => ipcRenderer.invoke(channel, ...args) as Promise<Return>;
    },
};

export class IpcClient {
    public static createWindow = ipcRendererFactory.invoke<void, [windowType: WindowType]>(IpcChannels.CreateWindow);
    public static getAppDetails = ipcRendererFactory.invoke<IAppDetails, []>(IpcChannels.GetAppDetails);
    public static getWindowType = ipcRendererFactory.invoke<WindowType, []>(IpcChannels.GetWindowType);
}
