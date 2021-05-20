import { IClientAreaSize } from '#RUtils/Types';

import { MainReducer } from '../types';

export const updateClientAreaSize: MainReducer<IClientAreaSize> = (state, action) => {
    state.displayConfiguration.clientAreaSize = action.payload;

    console.log('[ClientAreaSize]', action.payload);
};

export const _finishPreparing: MainReducer = (state) => {
    state.displayConfiguration.prepared = true;
};
