import type { AppDetails } from '@tecra/electron-common';

import type { MainReducer } from '../types';

export const _setAppDetails: MainReducer<AppDetails> = (draft, action) => {
    draft.appDetails = action.payload;
};
