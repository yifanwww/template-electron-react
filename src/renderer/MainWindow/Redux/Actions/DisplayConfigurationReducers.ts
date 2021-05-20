import { IClientAreaSize } from '#RUtils/Types';

import { MainReducer } from '../types';

export const updateClientAreaSize: MainReducer<IClientAreaSize> = (state, action) => {
    state.displayConfiguration.clientAreaSize = action.payload;

    console.log('[ClientAreaSize]', action.payload);
};
