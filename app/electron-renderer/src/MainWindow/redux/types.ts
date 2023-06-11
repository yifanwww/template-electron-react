import type { AppDetails } from '@tecra-pkg/electron-common';
import type { ClientAreaSize } from '@tecra-pkg/utils-react';
import type { ReduxReducer } from '@tecra-pkg/utils-redux';

interface DisplayConfig {
    clientAreaSize: ClientAreaSize;
}

export interface StoreState {
    appDetails: AppDetails;
    displayConfig: DisplayConfig;
    prepared: boolean;
}

export type MainReducer<Payload = undefined> = ReduxReducer<StoreState, Payload>;
