import { Draft } from 'immer';

export type ReactImmerReducer<State extends {}, Action> = (state: Draft<State>, action: Action) => void;
