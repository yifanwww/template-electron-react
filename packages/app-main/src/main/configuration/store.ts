import Store from 'electron-store';

import type { IWindowState } from './window';

export enum ConfigurationKey {
    MAIN_WINDOW_STATE = 'mainWindowState',
}

interface IAppConfiguration {
    [ConfigurationKey.MAIN_WINDOW_STATE]?: IWindowState;
}

export const store = new Store<IAppConfiguration>({
    serialize: (value) => JSON.stringify(value, null, 4),
});
