import {
    Action,
    ActionCreatorWithoutPayload,
    ActionCreatorWithPayload,
    PayloadAction,
    ThunkAction,
} from '@reduxjs/toolkit';
import { WritableDraft } from 'immer/dist/types/types-external';

// IReducer

export type IReducer<State, Payload = undefined> = (
    state: WritableDraft<State>,
    action: PayloadAction<Payload>,
) => void;

// IMapActionsToProps

type ActionCreator = ActionCreatorWithPayload<any> | ActionCreatorWithoutPayload;

type ReducerActions = { readonly [key: string]: ActionCreator };

type PayloadInAction<Action> = Action extends (payload: infer Payload) => PayloadAction<any>
    ? Payload
    : unknown;

type DispatchAction<Action extends ActionCreator> = Action extends ActionCreatorWithoutPayload
    ? () => ReturnType<Action>
    : (payload: PayloadInAction<Action>) => ReturnType<Action>;

export type IMapActionsToProps<Actions extends ReducerActions> = {
    readonly [ReducerName in keyof Actions]?: DispatchAction<Actions[ReducerName]>;
};

// IMapThunksToProps

type ThunkSet = {
    readonly [key: string]: (
        ...args: any
    ) => ThunkAction<Promise<void> | void, any, any, Action<any>>;
};

export type IMapThunksToProps<Thunks extends ThunkSet> = {
    readonly [ThunkName in keyof Thunks]?: (...args: Parameters<Thunks[ThunkName]>) => void;
};
