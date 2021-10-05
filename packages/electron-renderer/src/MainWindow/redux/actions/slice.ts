import { createSlice } from '@reduxjs/toolkit';
import { omitUnderscorePrefixActions } from '@tecra/utils-redux';

import { IStoreState } from '../types';
import { _finishPreparing, _setAppDetails } from './reducers';
import { updateClientAreaSize } from './reducers.DisplayConfig';

export function getInitialState(): IStoreState {
    return {
        appDetails: null as never,
        displayConfig: {
            clientAreaSize: null as never,
        },
        prepared: false,
    };
}

const slice = createSlice({
    name: 'Main',
    initialState: getInitialState(),
    reducers: {
        _finishPreparing,
        _setAppDetails,
        updateClientAreaSize,
    },
});

export const _actions = slice.actions;
export const _reducer = slice.reducer;

export const actions = omitUnderscorePrefixActions(slice.actions);
