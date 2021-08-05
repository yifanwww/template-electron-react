import { IReducer } from '#RUtils/Redux';

interface IDisplayConfig {
    clientAreaSize: IClientAreaSize;
    prepared: boolean;
}

export interface IStoreState {
    displayConfig: IDisplayConfig;
}

export type MainReducer<Payload = undefined> = IReducer<IStoreState, Payload>;
