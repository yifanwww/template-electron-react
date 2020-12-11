import { WindowType } from '#shared/WindowType';

import { AbstractWindow } from './AbstractWindow';

export class MainWindow extends AbstractWindow {
    public constructor() {
        super(WindowType.mainWindow);
    }
}
