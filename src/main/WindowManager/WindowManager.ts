import { AbstractWindow } from './AbstractWindow';
import { MainWindow } from './MainWindow';
import { CloseWindowOption, CreateWindowOption } from './Window.types';

export class WindowManager {
    private count: number = 0;
    private store: { [id: string]: AbstractWindow | undefined } = {};

    public createWindow = async (option: CreateWindowOption): Promise<void> => {
        this.count++;

        const { windowType } = option;
        const windowId = `${windowType}-${this.count}`;

        let never: never;
        switch (windowType) {
            case 'main':
                this.store[windowId] = new MainWindow({
                    windowId: '',
                    height: option?.height,
                    width: option?.width,
                    createWindow: this.createWindow,
                    onClosedWindow: this.onClosedWindow,
                });
                break;

            default:
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                never = windowType;
        }

        this.store[windowId]!.show();
    };

    private onClosedWindow = async (option: CloseWindowOption): Promise<void> => {
        const { windowId } = option;

        this.store[windowId] = undefined;
    };
}
