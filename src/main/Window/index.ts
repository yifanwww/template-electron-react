import { WindowType } from '@Utils';

import { MainWindow } from './MainWindow';

const isDevelopment = process.env.YF1999_Template_Electron_Mode === 'Development';

const mainWindow = new MainWindow();

export function CreateWindow(windowType: WindowType): Promise<void> | void {
    if (windowType === WindowType.MainWindow) {
        if (!mainWindow.State) {
            console.debug('Create main window.');
            return mainWindow.Create({ development: isDevelopment });
        }
    }
}
