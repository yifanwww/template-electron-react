import { configureStore } from '@reduxjs/toolkit';

import { mainReducer } from './slice';

export const mainStore = configureStore({ reducer: mainReducer });

export const mainDispatch = mainStore.dispatch;

export type MainStoreState = ReturnType<typeof mainStore.getState>;
