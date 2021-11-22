import { AppDetails } from '@tecra/electron-common';
import { MainReducer } from '../types';

export const _setAppDetails: MainReducer<AppDetails> = (state, action) => {
    state.appDetails = action.payload;
};

export const _finishPreparing: MainReducer = (state) => {
    state.prepared = true;
};
