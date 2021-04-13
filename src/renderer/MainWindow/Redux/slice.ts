import { configureStore, createSlice } from '@reduxjs/toolkit';

import { IClientAreaSize } from '#RUtils/GlobalTypes';
import { IReducer } from '#RUtils/Redux';

import { StoreState } from './types';

const initialState: StoreState = {
    clientAreaSize: { width: 1280, height: 720 },
};

// ------------------------------------------------------------------------------------------------------------ Reducers

type Reducer<Payload = undefined> = IReducer<StoreState, Payload>;

const updateClientAreaSize: Reducer<IClientAreaSize> = (state, action) => {
    state.clientAreaSize = action.payload;
};

// --------------------------------------------------------------------------------------------------------------- Slice

const { actions, reducer } = createSlice({
    name: 'Main',
    initialState,
    reducers: {
        updateClientAreaSize,
    },
});

export { actions };

export const store = configureStore({ reducer });
