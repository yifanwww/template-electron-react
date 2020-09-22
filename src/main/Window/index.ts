import { WindowType } from '@Utils/Window';

import { MainWindow } from './MainWindow';

const _isDevelopment = process.env.mode === 'development';

const _mainWindow = new MainWindow();

export function CreateWindow(windowType: WindowType) {
    if (windowType === WindowType.MainWindow) {
        if (!_mainWindow.State) {
            _mainWindow.Create({ development: _isDevelopment });
        }
    }
}
