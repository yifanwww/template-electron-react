import { WindowType } from '@app/common/apis/app';

import { AbstractWindow } from './abstractWindow';
import type { WindowOptions } from './types';

export class MainWindow extends AbstractWindow {
    constructor(option?: WindowOptions) {
        super({ type: WindowType.MAIN, ...option });
    }
}
