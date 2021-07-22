import { AbstractWindow } from './AbstractWindow';
import { IWindowOption } from './Types';

export class MainWindow extends AbstractWindow {
    public constructor(option: Omit<IWindowOption, 'windowType'>) {
        super({ windowType: 'main', ...option });
    }
}
