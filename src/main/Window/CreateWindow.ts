import { WindowType } from '#shared/WindowType';

// eslint-disable-next-line import/no-cycle
import { MainWindow } from './MainWindow';

const production = process.env.NODE_ENV === 'production';

const mainWindow = new MainWindow();

export function createWindow(windowType: WindowType): Promise<void> | void {
    if (windowType === WindowType.mainWindow) {
        if (!mainWindow.State) {
            // console.debug('Create main window.');
            return mainWindow.create({ production });
        }
    }
}
