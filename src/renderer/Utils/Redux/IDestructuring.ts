import {
    Action,
    ActionCreatorWithoutPayload,
    ActionCreatorWithPayload,
    PayloadAction,
    ThunkAction,
} from '@reduxjs/toolkit';

// IActionsDestructuring

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

export type IExactlyActionsDestructuring<
    TActionsDestructuring,
    TActions extends IActions
> = keyof TActionsDestructuring extends keyof IActionsDestructuring<TActions> ? TActionsDestructuring : never;

// IThunksDestructuring

export interface IThunks {
    readonly [key: string]: (...args: any) => ThunkAction<Promise<void> | void, any, any, Action<any>>;
}

export type IThunksDestructuring<TThunks extends IThunks> = {
    readonly [ThunkName in keyof TThunks]?: (...args: Parameters<TThunks[ThunkName]>) => void;
};

export type IExactlyThunksDestructuring<
    TThunksDestructuring,
    TThunks extends IThunks
> = keyof TThunksDestructuring extends keyof IThunksDestructuring<TThunks> ? TThunksDestructuring : never;
