import { WindowChannels, WindowType } from '@Utils';

import { AbstractWindow } from './AbstractWindow';

export class MainWindow extends AbstractWindow {
    public constructor() {
        super(WindowType.MainWindow, WindowChannels.MainWindow);
    }
}
