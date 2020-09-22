import { WindowType } from '@Utils/Window';

import { AbstractWindow } from './AbstractWindow';

export class MainWindow extends AbstractWindow {
    public constructor() {
        super(WindowType.MainWindow);
    }
}
