import { configureStore } from '@reduxjs/toolkit';

import { reducer } from './slice';

export const store = configureStore({ reducer });
export const sdispatch = store.dispatch;

export type StoreState = ReturnType<typeof store.getState>;
