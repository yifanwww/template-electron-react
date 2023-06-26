import type { AppDetails } from '@tecra/app-common';

import type { ClientAreaSize } from 'src/utils/react';
import type { ReduxReducer } from 'src/utils/redux';

interface DisplayConfig {
    clientAreaSize: ClientAreaSize | null;
}

export interface StoreState {
    appDetails: AppDetails | null;
    displayConfig: DisplayConfig;
}

export type MainReducer<Payload = undefined> = ReduxReducer<StoreState, Payload>;
