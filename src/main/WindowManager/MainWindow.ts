import { AbstractWindow, WindowOption } from './AbstractWindow';

export class MainWindow extends AbstractWindow {
    public constructor(option: Omit<WindowOption, 'windowType'>) {
        super({ windowType: 'main', ...option });
    }
}
