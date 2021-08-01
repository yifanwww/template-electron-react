import { CSSProperties, ReactNode } from 'react';

export type ReactStyleFunc<Args extends unknown[]> = (...args: Args) => CSSProperties;

export interface ReactChildrenProp {
    children?: ReactNode;
}
