import { AppDetails } from '@tecra/electron-common';
import { ReduxReducer } from '@tecra/utils-redux';

interface DisplayConfig {
    clientAreaSize: ClientAreaSize;
}

export interface StoreState {
    appDetails: AppDetails;
    displayConfig: DisplayConfig;
    prepared: boolean;
}

export type MainReducer<Payload = undefined> = ReduxReducer<StoreState, Payload>;
