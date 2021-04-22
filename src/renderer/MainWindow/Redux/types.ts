import { Action, ThunkAction } from '@reduxjs/toolkit';

import { IClientAreaSize } from '#RUtils/GlobalTypes';
import { IReducer } from '#RUtils/Redux';

export interface StoreState {
    clientAreaSize: IClientAreaSize;
}

export interface GlobalStoreState {}

export type MainReducer<Payload = undefined> = IReducer<StoreState, Payload>;

export type MainThunk<ReturnType = void> = ThunkAction<ReturnType, StoreState, unknown, Action<string>>;
export type MainPromiseThunk<ReturnType = void> = ThunkAction<Promise<ReturnType>, StoreState, unknown, Action<string>>;
