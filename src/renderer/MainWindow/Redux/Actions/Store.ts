import { configureStore, createSlice } from '@reduxjs/toolkit';

import { StoreState } from '../types';
import { updateClientAreaSize } from './DisplayConfigurationReducers';
import { _finishPreparing } from './Reducers';

function getInitialState(): StoreState {
    return {
        clientAreaSize: { height: 720, width: 1280 },
        prepared: false,
    };
}

const { actions, reducer } = createSlice({
    name: 'Main',
    initialState: getInitialState(),
    reducers: {
        _finishPreparing,
        updateClientAreaSize,
    },
});

export { actions };

export const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ immutableCheck: false, serializableCheck: false }),
});
