import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import { reducer } from './Slice';

export const store = configureStore({ reducer });

export type StoreState = ReturnType<typeof store.getState>;

// prettier-ignore
export type AppThunk<ReturnType = void> =
    ThunkAction<ReturnType, StoreState, unknown, Action<string>>;
