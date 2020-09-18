import {
    PayloadAction,
    ActionCreatorWithPayload,
    ActionCreatorWithoutPayload,
} from '@reduxjs/toolkit';
import { WritableDraft } from 'immer/dist/types/types-external';

// Reducer

export type IReducer<State, Payload = undefined> = (
    state: WritableDraft<State>,
    action: PayloadAction<Payload>
) => void;

// MapStateToProps

type StateDict = { [key: string]: any };

/** @todo */
type DeepStateDict = any;

export type IPickStateProps<States extends StateDict, Selections extends keyof States> = {
    readonly [StateName in Selections]: States[StateName];
};

/** @todo */
type IDeepPickStateProps<States extends DeepStateDict, Selections extends keyof States> = {
    readonly [StateName in Selections]: States[StateName];
};

// MapDispatchToProps

type ActionCreator = ActionCreatorWithPayload<any> | ActionCreatorWithoutPayload;

type PayloadInAction<Action> = Action extends (payload: infer Payload) => PayloadAction<any>
    ? Payload
    : unknown;

type DispatchAction<Action extends ActionCreator> = Action extends ActionCreatorWithoutPayload
    ? () => void
    : (payload: PayloadInAction<Action>) => void;

type ActionDict = { [key: string]: ActionCreator };

/** @todo */
type DeepActionDict = { [key: string]: ActionCreator };

export type IPickDispatchProps<Actions extends ActionDict, Selections extends keyof Actions> = {
    readonly [ReducerName in Selections]: DispatchAction<Actions[ReducerName]>;
};

/** @todo */
type IDeepPickDispatchProps<Actions extends DeepActionDict, Selections extends keyof Actions> = {
    readonly [ReducerName in Selections]: DispatchAction<Actions[ReducerName]>;
};
