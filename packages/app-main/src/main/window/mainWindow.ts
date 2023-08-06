import { WindowType } from '@ter/app-common/apis/app';

import { AbstractWindow } from './abstractWindow';
import type { WindowOption } from './types';

export class MainWindow extends AbstractWindow {
    constructor(option: WindowOption) {
        super({ windowType: WindowType.MAIN, ...option });
    }
}
