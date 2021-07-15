import { WindowType } from '#Common/WindowType';

export interface CreateWindowOption {
    windowType: WindowType;
    height?: number;
    width?: number;
}

export interface CloseWindowOption {
    windowId: string;
}
