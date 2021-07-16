import { IClientAreaSize } from '#RUtils/Types';
import { IReducer } from '#RUtils/Redux';

interface DisplayConfig {
    clientAreaSize: IClientAreaSize;
    prepared: boolean;
}

export interface StoreState {
    displayConfig: DisplayConfig;
}

export type MainReducer<Payload = undefined> = IReducer<StoreState, Payload>;
