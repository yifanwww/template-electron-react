import Store from 'electron-store';
import { AppInfo } from '../appInfo';
import type { IWindowState } from './window';

export enum ConfigurationKey {
    MAIN_WINDOW_STATE = 'mainWindowState',
    RESTORE_LAST_WINDOW_STATE = 'restoreLastWindowState',
}

interface IAppConfiguration {
    [ConfigurationKey.MAIN_WINDOW_STATE]?: IWindowState;
    [ConfigurationKey.RESTORE_LAST_WINDOW_STATE]?: boolean;
}

export const store = new Store<IAppConfiguration>({
    name: 'settings',
    fileExtension: 'json',
    cwd: AppInfo.INSTANCE.userDataPath,
    serialize: (value) => JSON.stringify(value, null, 4),
});
