import { AbstractWindow } from './abstractWindow';
import { MainWindow } from './mainWindow';
import { ICloseWindowOption, ICreateWindowOption } from './types';

interface IWindowStore {
    [id: string]: Optional<AbstractWindow>;
}

export class WindowManager {
    private count: number = 0;
    private store: IWindowStore = {};

    public createWindow = async (option: ICreateWindowOption): Promise<void> => {
        this.count++;

        const { windowType } = option;
        const windowId = `${windowType}-${this.count}`;

        let never: never;
        switch (windowType) {
            case 'main':
                this.store[windowId] = new MainWindow({
                    windowId,
                    height: option?.height,
                    width: option?.width,
                    createWindow: this.createWindow,
                    onClosedWindow: this.onClosedWindow,
                });
                break;

            default:
                never = windowType;
                console.error(`Wrong window type '${never}' to create the specified browser window`);
        }

        this.store[windowId]!.show();
    };

    private onClosedWindow = async (option: ICloseWindowOption): Promise<void> => {
        const { windowId } = option;

        this.store[windowId] = null;
    };
}
