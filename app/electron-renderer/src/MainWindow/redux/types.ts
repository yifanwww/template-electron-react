import type { AppDetails } from '@tecra-pkg/electron-common';
import type { ReduxReducer } from '@tecra-pkg/utils-redux';

import type { ClientAreaSize } from 'src/utils/react';

interface DisplayConfig {
    clientAreaSize: ClientAreaSize | null;
}

export interface StoreState {
    appDetails: AppDetails | null;
    displayConfig: DisplayConfig;
}

export type MainReducer<Payload = undefined> = ReduxReducer<StoreState, Payload>;
