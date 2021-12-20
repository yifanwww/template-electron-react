import { MainReducer } from '../types';

export const updateClientAreaSize: MainReducer<ClientAreaSize> = (state, action) => {
    state.displayConfig.clientAreaSize = action.payload;
};
