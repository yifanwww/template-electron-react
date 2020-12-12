import { createSlice } from '@reduxjs/toolkit';

import { ClientAreaSize } from '#shared/ClientAreaSize.types';
import type { IReducer, IMapActionsToProps } from '#RendererTypes';

interface AppState {
    clientAreaSize: ClientAreaSize;
}

// ---------------------------------------------------------------------------------------- Reducers

type ReducerFunc<Payload = undefined> = IReducer<AppState, Payload>;

const updateClientAreaSize: ReducerFunc<ClientAreaSize> = (state, action) => {
    state.clientAreaSize = action.payload;
};

// ------------------------------------------------------------------------------------------- Slice

const initialState: AppState = {
    clientAreaSize: { width: 1280, height: 720 },
};

const slice = createSlice({
    name: 'Slice_MainWindow',
    initialState,
    reducers: {
        updateClientAreaSize,
    },
});

export const Reducer = slice.reducer;

export const Actions = slice.actions;

export type MapActionsToProps = IMapActionsToProps<typeof Actions>;
