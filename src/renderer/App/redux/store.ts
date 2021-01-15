import { configureStore } from '@reduxjs/toolkit';

import { appReducer } from './slice';

export const appStore = configureStore({ reducer: appReducer });

export const appDispatch = appStore.dispatch;

export type AppStoreState = ReturnType<typeof appStore.getState>;
