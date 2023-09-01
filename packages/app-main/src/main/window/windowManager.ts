import { WindowType } from '@ter/app-common/apis/app';
import type { Nullable } from '@ter/app-common/types';

import { assertIsNever } from '../utils/assert';

import type { AbstractWindow } from './abstractWindow';
import { MainWindow } from './mainWindow';
import type { CloseWindowOption, CreateWindowOption } from './types';

type WindowStore = Record<number, Nullable<AbstractWindow>>;

export class WindowManager {
    private static _instance?: WindowManager;

    static get INSTANCE() {
        if (!WindowManager._instance) {
            WindowManager._instance = new WindowManager();
        }
        return WindowManager._instance;
    }

    private _store: WindowStore;

    private constructor() {
        this._store = {};
    }

    private _newWindow(type: WindowType): AbstractWindow {
        switch (type) {
            case WindowType.MAIN:
                return new MainWindow({
                    onClose: this._closeWindow,
                });

            /* istanbul ignore next */
            default:
                assertIsNever(type);
        }
    }

    createWindow(option: CreateWindowOption): void {
        const window = this._newWindow(option.type);
        this._store[window.id] = window;
        void window.show();
    }

    private _closeWindow = (option: CloseWindowOption): void => {
        this._store[option.id] = null;
    };
}
