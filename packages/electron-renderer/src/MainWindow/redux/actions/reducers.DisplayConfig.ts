import { MainReducer } from '../types';

export const updateClientAreaSize: MainReducer<IClientAreaSize> = (state, action) => {
    state.displayConfig.clientAreaSize = action.payload;

    console.log('[ClientAreaSize]', action.payload);
};
