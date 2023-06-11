import type { Draft, nothing } from 'immer';

export type ImmerReducer<S, A> = (draftState: Draft<S>, action: A) => void | (S extends undefined ? typeof nothing : S);

export interface ReactChildren {
    children?: React.ReactNode;
}

export type ReactStyleFunc<Args extends unknown[]> = (...args: Args) => React.CSSProperties;

export interface ClientAreaSize {
    width: number;
    height: number;
}
