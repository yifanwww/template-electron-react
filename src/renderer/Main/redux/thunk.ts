import { Action, ThunkAction } from '@reduxjs/toolkit';

import { MainStoreState } from './store';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type MainThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    MainStoreState,
    unknown,
    Action<string>
>;

export const mainThunks = {};
