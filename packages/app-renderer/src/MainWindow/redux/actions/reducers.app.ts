import type { AppDetails } from '@tecra/app-common';

import type { MainReducer } from '../types';

export const _setAppDetails: MainReducer<AppDetails> = (draft, action) => {
    draft.appDetails = action.payload;
};
