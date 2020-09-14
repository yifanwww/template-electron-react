import {
    PayloadAction, ActionCreatorWithPayload, ActionCreatorWithoutPayload
} from "@reduxjs/toolkit";
import { WritableDraft } from "immer/dist/types/types-external";

// Reducer

export type Reducer<State, Payload = undefined> =
    (state: WritableDraft<State>, payload: PayloadAction<Payload>) => void;

// MapStateToProps

export type StoreStateProps<StoreState extends { [stateName: string]: any }> = {
    readonly [StateName in keyof StoreState]?: StoreState[StateName];
}

// MapDispatchToProps

type ActionCreator = ActionCreatorWithPayload<any> | ActionCreatorWithoutPayload;

type PayloadInAction<Action> =
    Action extends (payload: infer Payload) => PayloadAction<any> ? Payload : unknown;

type DispatchAction<Action extends ActionCreator> =
    Action extends ActionCreatorWithoutPayload
    ? () => void
    : (payload: PayloadInAction<Action>) => void;

export type DispatchActionProps<Actions extends { [key: string]: ActionCreator }> = {
    readonly [ReducerName in keyof Actions]?: DispatchAction<Actions[ReducerName]>;
}
