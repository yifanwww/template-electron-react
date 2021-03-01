import {
    Action,
    ActionCreatorWithoutPayload,
    ActionCreatorWithPayload,
    Dispatch,
    PayloadAction,
    ThunkAction,
} from '@reduxjs/toolkit';

import { Contained } from '#shared/TypeUtils';

// ------------------------------------------------------------------------ IActionsDestructuring & ActionsDestructuring

export interface IActions {
    readonly [key: string]: ActionCreator;
}

type ActionCreator = ActionCreatorWithPayload<any> | ActionCreatorWithoutPayload;

type PayloadInAction<TAction> = TAction extends (payload: infer Payload) => PayloadAction<any> ? Payload : unknown;

type DispatchAction<TAction extends ActionCreator> = TAction extends ActionCreatorWithoutPayload
    ? () => ReturnType<TAction>
    : (payload: PayloadInAction<TAction>) => ReturnType<TAction>;

export type IActionsDestructuring<TActions extends IActions> = {
    readonly [ReducerName in keyof TActions]?: DispatchAction<TActions[ReducerName]>;
};

export type ActionsDestructuring<
    TActions extends IActions,
    TActionsDestructuring extends IActionsDestructuring<TActions>
> = (dispatch: Dispatch<any>, actions: TActions) => Contained<TActionsDestructuring, TActions>;

// -------------------------------------------------------------------------- IThunksDestructuring & ThunksDestructuring

export interface IThunks {
    readonly [key: string]: (...args: any) => ThunkAction<Promise<void> | void, any, any, Action<any>>;
}

export type IThunksDestructuring<TThunks extends IThunks> = {
    readonly [ThunkName in keyof TThunks]?: (...args: Parameters<TThunks[ThunkName]>) => void;
};

export type ThunksDestructuring<TThunks extends IThunks, TThunksDestructuring extends IThunksDestructuring<TThunks>> = (
    dispatch: Dispatch<any>,
    thunks: TThunks,
) => Contained<TThunksDestructuring, TThunks>;
