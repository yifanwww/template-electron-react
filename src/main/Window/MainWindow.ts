import { WindowType } from '#shared/WindowType';

// eslint-disable-next-line import/no-cycle
import { AbstractWindow } from './AbstractWindow';

export class MainWindow extends AbstractWindow {
    public constructor() {
        super(WindowType.mainWindow);
    }
}
