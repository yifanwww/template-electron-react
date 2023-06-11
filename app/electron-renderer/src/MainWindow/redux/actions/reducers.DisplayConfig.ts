import type { ClientAreaSize } from '@tecra-pkg/utils-react';

import type { MainReducer } from '../types';

export const updateClientAreaSize: MainReducer<ClientAreaSize> = (state, action) => {
    state.displayConfig.clientAreaSize = action.payload;
};
