import type { MenuItemConstructorOptions } from 'electron';
import { Menu, shell } from 'electron';
import { WindowType } from '@shared/apis/app';
import { ArrayUtil } from '@shared/utils';
import { ConfigurationKey, store } from '../configuration/store';
import { AbstractWindow } from './abstractWindow';

export class MainWindow extends AbstractWindow {
    constructor() {
        const memorizationEnabled = store.get(ConfigurationKey.RESTORE_LAST_WINDOW_STATE) ?? true;
        super({ memorizationEnabled, type: WindowType.MAIN });
    }

    protected override _onClosed() {
        store.set(ConfigurationKey.RESTORE_LAST_WINDOW_STATE, this._stateKeeper.enabled);
    }

    initApplicationMenu() {
        const isMac = process.platform === 'darwin';

        const template = ArrayUtil.filterFalsy<MenuItemConstructorOptions>([
            isMac && { role: 'appMenu' },
            {
                label: 'App',
                submenu: [
                    {
                        label: 'Remember Window State',
                        type: 'checkbox',
                        checked: this._stateKeeper.enabled,
                        click: () => {
                            this._stateKeeper.enabled = !this._stateKeeper.enabled;
                            store.set(ConfigurationKey.RESTORE_LAST_WINDOW_STATE, this._stateKeeper.enabled);
                        },
                    },
                    { role: isMac ? 'close' : 'quit' },
                ],
            },
            { role: 'editMenu' },
            { role: 'viewMenu' },
            { role: 'windowMenu' },
            {
                role: 'help',
                submenu: [
                    {
                        label: 'Learn More',
                        click: () => {
                            void shell.openExternal('https://electronjs.org');
                        },
                    },
                ],
            },
        ]);

        const menu = Menu.buildFromTemplate(template);
        this._window.setMenu(menu);
    }
}
