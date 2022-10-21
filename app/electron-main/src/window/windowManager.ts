import type { AbstractWindow } from './abstractWindow';
import { MainWindow } from './mainWindow';
import type { CloseWindowOption, CreateWindowOption } from './types';

interface WindowStore {
    [id: string]: Optional<AbstractWindow>;
}

export class WindowManager {
    private count: number = 0;
    private store: WindowStore = {};

    createWindow = (option: CreateWindowOption): void => {
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
                    onClose: this.closeWindow,
                });
                break;

            default:
                never = windowType;
                // eslint-disable-next-line no-console
                console.error(`Wrong window type '${never as string}' to create the specified browser window`);
        }

        this.store[windowId]!.show();
    };

    private closeWindow = (option: CloseWindowOption): void => {
        const { windowId } = option;

        this.store[windowId] = null;
    };
}

export const windowManager = new WindowManager();
