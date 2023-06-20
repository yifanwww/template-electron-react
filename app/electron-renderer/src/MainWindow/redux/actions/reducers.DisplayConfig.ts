import type { ClientAreaSize } from 'src/utils/react';

import type { MainReducer } from '../types';

export const updateClientAreaSize: MainReducer<ClientAreaSize> = (draft, action) => {
    draft.displayConfig.clientAreaSize = action.payload;
};
