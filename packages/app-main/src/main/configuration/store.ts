import Store from 'electron-store';

import type { ConfigurationKey, IWindowState } from './types';

interface IAppConfiguration {
    [ConfigurationKey.MAIN_WINDOW_STATE]?: IWindowState;
}

export const store = new Store<IAppConfiguration>({
    serialize: (value) => JSON.stringify(value, null, 4),
});
