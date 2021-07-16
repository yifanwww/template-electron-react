import { ActionCreatorWithoutPayload, ActionCreatorWithPayload, PayloadAction } from '@reduxjs/toolkit';

import { IThunk } from './Thunk';

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
    readonly [key: string]: (...args: never[]) => IThunk<unknown, never, never>;
}

// prettier-ignore
export type IDispatchingThunks<TThunks extends IThunks> = {
    readonly [ThunkName in keyof TThunks]:
        (...args: Parameters<TThunks[ThunkName]>) => ReturnType<ReturnType<TThunks[ThunkName]>>;
};
