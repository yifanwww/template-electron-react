import type { Draft, nothing } from 'immer';

export type ImmerReducer<S, A> = (draftState: Draft<S>, action: A) => void | (S extends undefined ? typeof nothing : S);
