import { WindowType } from '@tecra-pkg/electron-common';

import { AbstractWindow } from './abstractWindow';
import type { WindowOption } from './types';

export class MainWindow extends AbstractWindow {
    constructor(option: WindowOption) {
        super({ windowType: WindowType.MAIN, ...option });
    }
}
