import { IClientAreaSize } from '#RUtils/GlobalTypes';

import { MainReducer } from '../types';

export const updateClientAreaSize: MainReducer<IClientAreaSize> = (state, action) => {
    state.clientAreaSize = action.payload;

    console.log('[ClientAreaSize]', action.payload);
};
