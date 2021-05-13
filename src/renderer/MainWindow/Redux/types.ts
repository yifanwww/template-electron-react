import { AnyAction, ThunkAction } from '@reduxjs/toolkit';

import { IClientAreaSize } from '#RUtils/Types';
import { IReducer } from '#RUtils/Redux';

interface DisplayConfigurationState {
    clientAreaSize: IClientAreaSize;
}

export interface StoreState extends DisplayConfigurationState {
    prepared: boolean;
}

export type MainReducer<Payload = undefined> = IReducer<StoreState, Payload>;

export type MainThunk<ReturnType = void> = ThunkAction<ReturnType, StoreState, unknown, AnyAction>;
export type MainPromiseThunk<ReturnType = void> = ThunkAction<Promise<ReturnType>, StoreState, unknown, AnyAction>;
