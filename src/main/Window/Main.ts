import { WindowType } from '#shared/WindowType';

// eslint-disable-next-line import/no-cycle
import { AbstractWindow } from './AbstractWindow';

export class Main extends AbstractWindow {
    public constructor() {
        super(WindowType.main);
    }
}
