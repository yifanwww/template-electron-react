import { createSlice } from '@reduxjs/toolkit';

import { omitUnderscorePrefixActions } from 'src/utils/redux';

import type { StoreState } from '../types';

import { _setAppDetails } from './reducers.app';
import { updateClientAreaSize } from './reducers.DisplayConfig';

export function getInitialState(): StoreState {
    return {
        appDetails: null,
        displayConfig: {
            clientAreaSize: null,
        },
    };
}

const slice = createSlice({
    name: 'Main',
    initialState: getInitialState(),
    reducers: {
        _setAppDetails,
        updateClientAreaSize,
    },
});

export const _actions = slice.actions;
export const _reducer = slice.reducer;

export const actions = omitUnderscorePrefixActions(slice.actions);
