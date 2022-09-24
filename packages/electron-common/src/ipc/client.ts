import { ipcRenderer } from 'electron';

import { AppDetails, WindowType } from '../type';
import { IpcChannels } from './channels';

const ipcRendererFactory = {
    invoke: <Return, Args extends unknown[]>(channel: string) => {
        return (...args: Args) => ipcRenderer.invoke(channel, ...args) as Promise<Return>;
    },
};

export class IpcClient {
    static createWindow = ipcRendererFactory.invoke<void, [windowType: WindowType]>(IpcChannels.CREATE_WINDOW);
    static getAppDetails = ipcRendererFactory.invoke<AppDetails, []>(IpcChannels.GET_APP_DETAILS);
    static getWindowType = ipcRendererFactory.invoke<WindowType, []>(IpcChannels.GET_WINDOW_TYPE);
}
