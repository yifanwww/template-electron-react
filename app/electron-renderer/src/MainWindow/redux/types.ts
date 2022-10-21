import { AppDetails } from '@tecra-pkg/electron-common';
import { ReduxReducer } from '@tecra-pkg/utils-redux';

interface DisplayConfig {
    clientAreaSize: ClientAreaSize;
}

export interface StoreState {
    appDetails: AppDetails;
    displayConfig: DisplayConfig;
    prepared: boolean;
}

export type MainReducer<Payload = undefined> = ReduxReducer<StoreState, Payload>;