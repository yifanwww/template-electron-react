import { createSlice } from '@reduxjs/toolkit';

import type { ClientAreaSize, IReducer, IMapActionsToProps } from '#RUtils/Types';

interface AppState {
    clientAreaSize: ClientAreaSize;
}

const initialState: AppState = {
    clientAreaSize: { width: 1280, height: 720 },
};

// ---------------------------------------------------------------------------------------- Reducers

type Reducer<Payload = undefined> = IReducer<AppState, Payload>;

const updateClientAreaSize: Reducer<ClientAreaSize> = (state, action) => {
    state.clientAreaSize = action.payload;

    console.log(`update clientarea: ${JSON.stringify(action.payload)}.`);
};

// ------------------------------------------------------------------------------------------- Slice

const slice = createSlice({
    name: 'ReactApp',
    initialState,
    reducers: {
        updateClientAreaSize,
    },
});

export const { actions, reducer } = slice;

export type MapActionsToProps = IMapActionsToProps<typeof actions>;
