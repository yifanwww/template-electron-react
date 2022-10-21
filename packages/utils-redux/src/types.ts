import type {
    ActionCreatorWithoutPayload,
    ActionCreatorWithPayload,
    AnyAction,
    PayloadAction,
    ThunkAction,
    ThunkDispatch,
} from '@reduxjs/toolkit';
import type { Draft } from 'immer';

export type ReduxReducer<State extends {}, Payload> = (state: Draft<State>, action: PayloadAction<Payload>) => void;

// ------------------------------------------------------------------------------------------------------------- ThunkFn

export type ReduxThunkAction<ReturnType, State> = ThunkAction<ReturnType, State, unknown, AnyAction>;

export type ThunkFn<ReturnType, State, ThunkArgs extends unknown[]> = (
    dispatch: ThunkDispatch<State, unknown, AnyAction>,
    getState: () => State,
    ...thunkArgs: ThunkArgs
) => ReturnType;

// -------------------------------------------------------------------------------------------------- DispatchingActions

export interface ReduxActions {
    readonly [key: string]: ActionCreator;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ActionCreator = ActionCreatorWithPayload<any> | ActionCreatorWithoutPayload;

type PayloadInAction<TAction> = TAction extends (payload: infer Payload) => PayloadAction<unknown> ? Payload : unknown;

type DispatchAction<TAction extends ActionCreator> = TAction extends ActionCreatorWithoutPayload
    ? () => ReturnType<TAction>
    : (payload: PayloadInAction<TAction>) => ReturnType<TAction>;

export type DispatchingActions<TActions extends ReduxActions> = {
    readonly [ReducerName in keyof TActions]: DispatchAction<TActions[ReducerName]>;
};

// --------------------------------------------------------------------------------------------------- DispatchingThunks

export interface ReduxThunks {
    readonly [key: string]: (...args: never[]) => ReduxThunkAction<unknown, never>;
}

// prettier-ignore
export type DispatchingThunks<TThunks extends ReduxThunks> = {
    readonly [ThunkName in keyof TThunks]:
        (...args: Parameters<TThunks[ThunkName]>) => ReturnType<ReturnType<TThunks[ThunkName]>>;
};
