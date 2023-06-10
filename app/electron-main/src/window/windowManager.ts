import type { AbstractWindow } from './abstractWindow';
import { MainWindow } from './mainWindow';
import type { CloseWindowOption, CreateWindowOption } from './types';

interface WindowStore {
    [id: string]: Optional<AbstractWindow>;
}

export class WindowManager {
    private _count: number = 0;
    private _store: WindowStore = {};

    createWindow = (option: CreateWindowOption): void => {
        this._count++;

        const { windowType } = option;
        const windowId = `${windowType}-${this._count}`;

        let never: never;
        switch (windowType) {
            case 'main':
                this._store[windowId] = new MainWindow({
                    windowId,
                    height: option?.height,
                    width: option?.width,
                    onClose: this._closeWindow,
                });
                break;

            default:
                never = windowType;
                // eslint-disable-next-line no-console
                console.error(`Wrong window type '${never as string}' to create the specified browser window`);
        }

        this._store[windowId]!.show();
    };

    private _closeWindow = (option: CloseWindowOption): void => {
        const { windowId } = option;

        this._store[windowId] = null;
    };
}

export const windowManager = new WindowManager();
