import { AbstractWindow } from './AbstractWindow';
import { MainWindow } from './MainWindow';
import { ICloseWindowOption, ICreateWindowOption } from './Types';

export class WindowManager {
    private count: number = 0;
    private store: { [id: string]: AbstractWindow | undefined } = {};

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

        this.store[windowId] = undefined;
    };
}
