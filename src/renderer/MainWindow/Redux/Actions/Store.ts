import { configureStore, createSlice } from '@reduxjs/toolkit';

import { omitUnderscorePrefixActions } from '#RUtils/Redux';

import { StoreState } from '../types';
import { _finishPreparing, updateClientAreaSize } from './DisplayConfigReducers';

function getInitialState(): StoreState {
    return {
        displayConfig: {
            clientAreaSize: { height: 720, width: 1280 },
            prepared: false,
        },
    };
}

const { actions: _actions, reducer } = createSlice({
    name: 'Main',
    initialState: getInitialState(),
    reducers: {
        _finishPreparing,
        updateClientAreaSize,
    },
});

export { _actions };

export const actions = omitUnderscorePrefixActions(_actions);

export const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ immutableCheck: false, serializableCheck: false }),
});
