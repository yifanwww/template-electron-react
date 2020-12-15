import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import { Reducer } from './Slice';

export const Store = configureStore({ reducer: Reducer });

export type StoreState = ReturnType<typeof Store.getState>;

// prettier-ignore
export type AppThunk<ReturnType = void> =
    ThunkAction<ReturnType, StoreState, unknown, Action<string>>;
