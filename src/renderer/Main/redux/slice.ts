import { createSlice } from '@reduxjs/toolkit';

import type { ClientAreaSize, IReducer, IMapActionsToProps } from '#RUtils/Types';

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

export const { actions: mainActions, reducer: mainReducer } = createSlice({
    name: 'ReactApp',
    initialState,
    reducers: {
        updateClientAreaSize,
    },
});

export type MainMapActionsToProps = IMapActionsToProps<typeof mainActions>;
