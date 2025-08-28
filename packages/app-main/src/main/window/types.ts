import type { WindowType } from '@app/common/apis/app';

export interface WindowOptions {
    onClosed?: (windowId: number) => void | Promise<void>;
}

export interface AbstractWindowOptions extends WindowOptions {
    type: WindowType;
}
