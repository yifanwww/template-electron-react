/// <reference types="react-scripts" />
/// <reference path="../common/common.d.ts" />

import { CSSProperties, ReactNode } from 'react';

declare global {
    type ReactStyleFunc<Args extends unknown[]> = (...args: Args) => CSSProperties;

    interface IReactChildrenProp {
        children?: ReactNode;
    }

    interface IClientAreaSize {
        width: number;
        height: number;
    }

    interface IElementSize {
        width: number;
        height: number;
    }

    interface IElementPositionSize {
        left: number;
        top: number;
        width: number;
        height: number;
    }
}
