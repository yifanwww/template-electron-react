import { configureStore } from '@reduxjs/toolkit';

import { mainReducer } from './slice';

export const mainStore = configureStore({ reducer: mainReducer });

export type MainStoreState = ReturnType<typeof mainStore.getState>;
