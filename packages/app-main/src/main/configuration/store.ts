import Store from 'electron-store';

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
    serialize: (value) => JSON.stringify(value, null, 4),
});
