import { WindowType } from '@tecra-pkg/electron-common';

export interface CreateWindowOption {
    windowType: WindowType;
    height?: number;
    width?: number;
}

export interface CloseWindowOption {
    windowId: string;
}

export interface WindowOption {
    windowId: string;
    height?: number;
    width?: number;
    onClose: (option: CloseWindowOption) => void | Promise<void>;
}

export interface AbstractWindowOption extends WindowOption {
    windowType: WindowType;
}
