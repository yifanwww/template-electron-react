import {
    ActionCreatorWithoutPayload,
    ActionCreatorWithPayload,
    AnyAction,
    PayloadAction,
    ThunkAction,
    ThunkDispatch,
} from '@reduxjs/toolkit';
import { Draft } from 'immer';

export type ReduxReducer<State extends {}, Payload> = (state: Draft<State>, action: PayloadAction<Payload>) => void;

// -------------------------------------------------------------------------------------------------------------- IThunk

export type ReduxThunkAction<ReturnType, State> = ThunkAction<ReturnType, State, unknown, AnyAction>;

export type ThunkFn<ReturnType, State, ThunkArgs extends unknown[]> = (
    dispatch: ThunkDispatch<State, never, AnyAction>,
    getState: () => State,
    ...thunkArgs: ThunkArgs
) => ReturnType;

export type ThunkArgsAction<ReturnType, State, ThunkArgs extends unknown[]> = ThunkArgs extends undefined
    ? () => ReduxThunkAction<ReturnType, State>
    : (...thunkArgs: ThunkArgs) => ReduxThunkAction<ReturnType, State>;

// ------------------------------------------------------------------------------------------------- IDispatchingActions

export interface IActions {
    readonly [key: string]: ActionCreator;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ActionCreator = ActionCreatorWithPayload<any> | ActionCreatorWithoutPayload;

type PayloadInAction<TAction> = TAction extends (payload: infer Payload) => PayloadAction<unknown> ? Payload : unknown;

type DispatchAction<TAction extends ActionCreator> = TAction extends ActionCreatorWithoutPayload
    ? () => ReturnType<TAction>
    : (payload: PayloadInAction<TAction>) => ReturnType<TAction>;

export type IDispatchingActions<TActions extends IActions> = {
    readonly [ReducerName in keyof TActions]: DispatchAction<TActions[ReducerName]>;
};

// -------------------------------------------------------------------------------------------------- IDispatchingThunks

export interface IThunks {
    readonly [key: string]: (...args: never[]) => ReduxThunkAction<unknown, never>;
}

// prettier-ignore
export type IDispatchingThunks<TThunks extends IThunks> = {
    readonly [ThunkName in keyof TThunks]:
        (...args: Parameters<TThunks[ThunkName]>) => ReturnType<ReturnType<TThunks[ThunkName]>>;
};
