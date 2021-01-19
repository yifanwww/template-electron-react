import { WindowType } from '#shared/WindowType';

// eslint-disable-next-line import/no-cycle
import { Main } from './Main';

const production = process.env.NODE_ENV === 'production';

const main = new Main();

export function createWindow(windowType: WindowType): Promise<void> | void {
    if (windowType === WindowType.main) {
        if (!main.state) {
            // console.debug('Create main window.');
            return main.create({ production });
        }
    }
}
