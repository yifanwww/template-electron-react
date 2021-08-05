import { MainReducer } from '../Types';

export const _finishPreparing: MainReducer = (state) => {
    state.displayConfig.prepared = true;
};

export const updateClientAreaSize: MainReducer<IClientAreaSize> = (state, action) => {
    state.displayConfig.clientAreaSize = action.payload;

    console.log('[ClientAreaSize]', action.payload);
};
