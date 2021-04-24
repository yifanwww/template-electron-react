import {
    ActionCreatorWithoutPayload,
    ActionCreatorWithPayload,
    AnyAction,
    PayloadAction,
    ThunkAction,
} from '@reduxjs/toolkit';

// -------------------------------------------------------------------------------------------------- IDispatchedActions

export interface IActions {
    readonly [key: string]: ActionCreator;
}

type ActionCreator = ActionCreatorWithPayload<any> | ActionCreatorWithoutPayload;

type PayloadInAction<TAction> = TAction extends (payload: infer Payload) => PayloadAction<any> ? Payload : unknown;

type DispatchAction<TAction extends ActionCreator> = TAction extends ActionCreatorWithoutPayload
    ? () => ReturnType<TAction>
    : (payload: PayloadInAction<TAction>) => ReturnType<TAction>;

export type IDispatchedActions<TActions extends IActions> = {
    readonly [ReducerName in keyof TActions]: DispatchAction<TActions[ReducerName]>;
};

// --------------------------------------------------------------------------------------------------- IDispatchedThunks

export interface IThunks {
    readonly [key: string]: (...args: any[]) => ThunkAction<any, any, any, AnyAction>;
}

// prettier-ignore
export type IDispatchedThunks<TThunks extends IThunks> = {
    readonly [ThunkName in keyof TThunks]:
        (...args: Parameters<TThunks[ThunkName]>) => ReturnType<ReturnType<TThunks[ThunkName]>>;
};
