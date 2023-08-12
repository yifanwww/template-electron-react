import type { WindowType } from '@ter/app-common/apis/app';

export interface CreateWindowOption {
    type: WindowType;
}

export interface CloseWindowOption {
    id: number;
}

export interface WindowOption {
    onClose: (option: CloseWindowOption) => void | Promise<void>;
}

export interface AbstractWindowOption extends WindowOption {
    type: WindowType;
}
