import { IClientAreaSize } from '#RUtils/Types';
import { IAsyncThunk, IReducer, IThunk } from '#RUtils/Redux';

interface DisplayConfigurationState {
    clientAreaSize: IClientAreaSize;
    prepared: boolean;
}

export interface StoreState {
    displayConfiguration: DisplayConfigurationState;
}

export type MainReducer<Payload = undefined> = IReducer<StoreState, Payload>;

export type MainThunk<ReturnType = void> = IThunk<ReturnType, StoreState, unknown>;
export type MainAsyncThunk<ReturnType = void> = IAsyncThunk<ReturnType, StoreState, unknown>;
