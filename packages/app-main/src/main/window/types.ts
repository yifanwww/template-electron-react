import type { WindowType } from '@ter/app-common/apis/app';

export interface WindowOptions {
    onClosed?: (windowId: number) => void | Promise<void>;
}

export interface AbstractWindowOptions extends WindowOptions {
    type: WindowType;
}
