import type { AppDetails } from '@ter/app-common/apis/app';
import type { Nullable } from '@ter/app-common/types';

import type { ReduxReducer } from 'src/utils/redux';

export interface StoreState {
    appDetails: Nullable<AppDetails>;
}

export type MainReducer<Payload = undefined> = ReduxReducer<StoreState, Payload>;
