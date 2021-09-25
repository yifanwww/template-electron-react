import { AbstractWindow } from './abstractWindow';
import { IWindowOption } from './types';

export class MainWindow extends AbstractWindow {
    public constructor(option: Omit<IWindowOption, 'windowType'>) {
        super({ windowType: 'main', ...option });
    }
}
