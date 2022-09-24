import { Draft } from 'immer';

export type ImmerReducer<State extends {}, Action> = (state: Draft<State>, action: Action) => void;
