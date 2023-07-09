import type { AppDetails } from '@tecra/app-common';

import type { ReduxReducer } from 'src/utils/redux';

export interface StoreState {
    appDetails: AppDetails | null;
}

export type MainReducer<Payload = undefined> = ReduxReducer<StoreState, Payload>;
