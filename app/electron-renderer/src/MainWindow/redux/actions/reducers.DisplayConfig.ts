import type { ClientAreaSize } from '@tecra-pkg/utils-react';

import type { MainReducer } from '../types';

export const updateClientAreaSize: MainReducer<ClientAreaSize> = (draft, action) => {
    draft.displayConfig.clientAreaSize = action.payload;
};
