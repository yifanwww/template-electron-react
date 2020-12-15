import {
    ActionCreatorWithPayload,
    ActionCreatorWithoutPayload,
    Dispatch,
    PayloadAction,
} from '@reduxjs/toolkit';
import { WritableDraft } from 'immer/dist/types/types-external';

// Reducer

export type IReducer<State, Payload = undefined> = (
    state: WritableDraft<State>,
    action: PayloadAction<Payload>,
) => void;

// MapDispatchToProps

type ActionCreator = ActionCreatorWithPayload<any> | ActionCreatorWithoutPayload;

type PayloadInAction<Action> = Action extends (payload: infer Payload) => PayloadAction<any>
    ? Payload
    : unknown;

type DispatchAction<Action extends ActionCreator> = Action extends ActionCreatorWithoutPayload
    ? () => ReturnType<Action>
    : (payload: PayloadInAction<Action>) => ReturnType<Action>;

type ReducerAction = { readonly [key: string]: ActionCreator };

export type IMapActionsToProps<Actions extends ReducerAction> = (
    dispatch: Dispatch,
) => {
    readonly [ReducerName in keyof Actions]?: DispatchAction<Actions[ReducerName]>;
};
