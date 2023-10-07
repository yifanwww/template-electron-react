import { createSlice } from '@reduxjs/toolkit';

import { omitUnderscorePrefixActions } from 'src/utils/redux';

import type { StoreState } from '../types';

import * as appReducers from './reducers.app';

export function getInitialState(): StoreState {
    return {};
}

const slice = createSlice({
    name: 'Main',
    initialState: getInitialState(),
    reducers: {
        ...appReducers,
    },
});

export const _actions = slice.actions;
export const _reducer = slice.reducer;

export const actions = omitUnderscorePrefixActions(slice.actions);
