import { IClientAreaSize } from '#RUtils/Types';

import { MainReducer } from '../types';

export const updateClientAreaSize: MainReducer<IClientAreaSize> = (state, action) => {
    state.displayConfig.clientAreaSize = action.payload;

    console.log('[ClientAreaSize]', action.payload);
};

export const _finishPreparing: MainReducer = (state) => {
    state.displayConfig.prepared = true;
};
