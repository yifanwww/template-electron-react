import type { AppDetails } from '@tecra-pkg/electron-common';

import type { MainReducer } from '../types';

export const _setAppDetails: MainReducer<AppDetails> = (draft, action) => {
    draft.appDetails = action.payload;
};

export const _finishPreparing: MainReducer = (draft) => {
    draft.prepared = true;
};
