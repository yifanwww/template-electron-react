import type { WindowType } from '@tecra/electron-common';

export interface CreateWindowOption {
    windowType: WindowType;
}

export interface CloseWindowOption {
    windowId: string;
}

export interface WindowOption {
    windowId: string;
    onClose: (option: CloseWindowOption) => void | Promise<void>;
}

export interface AbstractWindowOption extends WindowOption {
    windowType: WindowType;
}