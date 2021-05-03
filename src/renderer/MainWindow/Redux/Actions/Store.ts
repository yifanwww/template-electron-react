import { configureStore, createSlice } from '@reduxjs/toolkit';

import { StoreState } from '../types';
import { updateClientAreaSize } from './DisplayConfigurationReducers';

const initialState: StoreState = {
    clientAreaSize: { height: 720, width: 1280 },
};

const { actions, reducer } = createSlice({
    name: 'Main',
    initialState,
    reducers: {
        updateClientAreaSize,
    },
});

export { actions };

export const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ immutableCheck: false, serializableCheck: false }),
});
