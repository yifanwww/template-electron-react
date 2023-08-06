import { WindowType } from '@ter/app-common/apis/app';
import type { Nullable } from '@ter/app-common/types';
import { assertIsNever } from '@ter/app-common/utils';

import type { AbstractWindow } from './abstractWindow';
import { MainWindow } from './mainWindow';
import type { CloseWindowOption, CreateWindowOption } from './types';

interface WindowStore {
    [id: string]: Nullable<AbstractWindow>;
}

export class WindowManager {
    private _count = 0;
    private _store: WindowStore = {};

    createWindow = (option: CreateWindowOption): void => {
        this._count++;

        const { windowType } = option;
        const windowId = `${windowType}-${this._count}`;

        switch (windowType) {
            case WindowType.MAIN:
                this._store[windowId] = new MainWindow({
                    windowId,
                    onClose: this._closeWindow,
                });
                break;

            /* istanbul ignore next */
            default:
                assertIsNever(windowType);
        }

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        void this._store[windowId]!.show();
    };

    private _closeWindow = (option: CloseWindowOption): void => {
        const { windowId } = option;

        this._store[windowId] = null;
    };
}

export const windowManager = new WindowManager();
