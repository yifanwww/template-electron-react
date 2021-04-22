import { Action, ThunkAction } from '@reduxjs/toolkit';

import { IClientAreaSize } from '#RUtils/GlobalTypes';
import { IReducer } from '#RUtils/Redux';

export interface StoreState {
    clientAreaSize: IClientAreaSize;
}

export interface GlobalStoreState {}

export type Reducer<Payload = undefined> = IReducer<StoreState, Payload>;

export type Thunk<ReturnType = void> = ThunkAction<ReturnType, StoreState, unknown, Action<string>>;
