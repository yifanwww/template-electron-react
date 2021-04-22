import { IClientAreaSize } from '#RUtils/GlobalTypes';

import { Reducer } from '../types';

export const updateClientAreaSize: Reducer<IClientAreaSize> = (state, action) => {
    state.clientAreaSize = action.payload;

    console.log('[ClientAreaSize]', action.payload);
};
