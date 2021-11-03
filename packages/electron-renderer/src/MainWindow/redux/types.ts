import { IAppDetails } from '@tecra/electron-common';
import { ReduxReducer } from '@tecra/utils-redux';

interface IDisplayConfig {
    clientAreaSize: IClientAreaSize;
}

export interface IStoreState {
    appDetails: IAppDetails;
    displayConfig: IDisplayConfig;
    prepared: boolean;
}

export type MainReducer<Payload = undefined> = ReduxReducer<IStoreState, Payload>;
