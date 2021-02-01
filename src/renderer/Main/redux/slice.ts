import { createSlice } from '@reduxjs/toolkit';

import { ClientAreaSize } from '#RUtils/ClientArea';
import { IReducer } from '#RUtils/Redux';

interface MainState {
    clientAreaSize: ClientAreaSize;
}

const initialState: MainState = {
    clientAreaSize: { width: 1280, height: 720 },
};

// ---------------------------------------------------------------------------------------- Reducers

type Reducer<Payload = undefined> = IReducer<MainState, Payload>;

const updateClientAreaSize: Reducer<ClientAreaSize> = (state, action) => {
    state.clientAreaSize = action.payload;

    console.log(`update clientarea: ${JSON.stringify(action.payload)}.`);
};

// ------------------------------------------------------------------------------------------- Slice

export const { actions, reducer } = createSlice({
    name: 'Main',
    initialState,
    reducers: {
        updateClientAreaSize,
    },
});
