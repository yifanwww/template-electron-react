import type { AppDetails, Nullable } from '@ter/app-common';

import type { ReduxReducer } from 'src/utils/redux';

export interface StoreState {
    appDetails: Nullable<AppDetails>;
}

export type MainReducer<Payload = undefined> = ReduxReducer<StoreState, Payload>;
