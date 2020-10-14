/* eslint-disable @typescript-eslint/indent */
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

export const Store = configureStore({ reducer: {} });

export type StoreState = ReturnType<typeof Store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    StoreState,
    unknown,
    Action<string>
>;
