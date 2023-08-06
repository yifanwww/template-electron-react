import type { AppDetails } from '@ter/app-common/apis/app';

import type { MainReducer } from '../types';

export const _setAppDetails: MainReducer<AppDetails> = (draft, action) => {
    draft.appDetails = action.payload;
};
