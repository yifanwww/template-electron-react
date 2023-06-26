import { WindowType } from '@tecra/app-common';

import { AbstractWindow } from './abstractWindow';
import type { WindowOption } from './types';

export class MainWindow extends AbstractWindow {
    constructor(option: WindowOption) {
        super({ windowType: WindowType.MAIN, ...option });
    }
}
