import { WindowType } from '@tecra/electron-common';

export interface ICreateWindowOption {
    windowType: WindowType;
    height?: number;
    width?: number;
}

export interface ICloseWindowOption {
    windowId: string;
}

export interface IWindowOption {
    windowId: string;
    height?: number;
    width?: number;
    createWindow: (option: ICreateWindowOption) => Promise<void>;
    onClosedWindow: (option: ICloseWindowOption) => Promise<void>;
}

export interface IAbstractWindowOption extends IWindowOption {
    windowType: WindowType;
}
