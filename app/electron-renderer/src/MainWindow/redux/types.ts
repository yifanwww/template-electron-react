import type { AppDetails } from '@tecra-pkg/electron-common';
import type { ClientAreaSize } from '@tecra-pkg/utils-react';
import type { ReduxReducer } from '@tecra-pkg/utils-redux';

interface DisplayConfig {
    clientAreaSize: ClientAreaSize | null;
}

export interface StoreState {
    appDetails: AppDetails | null;
    displayConfig: DisplayConfig;
}

export type MainReducer<Payload = undefined> = ReduxReducer<StoreState, Payload>;
