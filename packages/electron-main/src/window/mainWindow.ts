import { AbstractWindow } from './abstractWindow';
import { WindowOption } from './types';

export class MainWindow extends AbstractWindow {
    public constructor(option: Omit<WindowOption, 'windowType'>) {
        super({ windowType: 'main', ...option });
    }
}
