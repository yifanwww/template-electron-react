import type { AppDetails } from '@ter/app-common/apis/app';

import type { ReduxReducer } from 'src/utils/redux';

export interface StoreState {
    appDetails?: AppDetails;
}

export type MainReducer<Payload = undefined> = ReduxReducer<StoreState, Payload>;
