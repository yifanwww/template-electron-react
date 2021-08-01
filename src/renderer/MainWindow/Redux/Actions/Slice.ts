import { createSlice } from '@reduxjs/toolkit';

import { omitUnderscorePrefixActions } from '#RUtils/Redux';

import { IStoreState } from '../Types';
import { _finishPreparing, updateClientAreaSize } from './Reducers.DisplayConfig';

export function getInitialState(): IStoreState {
    return {
        displayConfig: {
            clientAreaSize: { height: 720, width: 1280 },
            prepared: false,
        },
    };
}

const slice = createSlice({
    name: 'Main',
    initialState: getInitialState(),
    reducers: {
        _finishPreparing,
        updateClientAreaSize,
    },
});

export const _actions = slice.actions;
export const _reducer = slice.reducer;

export const actions = omitUnderscorePrefixActions(slice.actions);
