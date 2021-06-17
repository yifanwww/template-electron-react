import {
    ActionCreatorWithoutPayload,
    ActionCreatorWithPayload,
    AnyAction,
    PayloadAction,
    ThunkAction,
} from '@reduxjs/toolkit';

// ------------------------------------------------------------------------------------------------- IDispatchingActions

export interface IActions {
    readonly [key: string]: ActionCreator;
}

type ActionCreator = ActionCreatorWithPayload<unknown> | ActionCreatorWithoutPayload;

type PayloadInAction<TAction> = TAction extends (payload: infer Payload) => PayloadAction<unknown> ? Payload : unknown;

type DispatchAction<TAction extends ActionCreator> = TAction extends ActionCreatorWithoutPayload
    ? () => ReturnType<TAction>
    : (payload: PayloadInAction<TAction>) => ReturnType<TAction>;

export type IDispatchingActions<TActions extends IActions> = {
    readonly [ReducerName in keyof TActions]: DispatchAction<TActions[ReducerName]>;
};

// -------------------------------------------------------------------------------------------------- IDispatchingThunks

export interface IThunks {
    readonly [key: string]: (...args: unknown[]) => ThunkAction<unknown, unknown, unknown, AnyAction>;
}

// prettier-ignore
export type IDispatchingThunks<TThunks extends IThunks> = {
    readonly [ThunkName in keyof TThunks]:
        (...args: Parameters<TThunks[ThunkName]>) => ReturnType<ReturnType<TThunks[ThunkName]>>;
};
