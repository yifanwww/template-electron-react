import { Action, ThunkAction } from '@reduxjs/toolkit';

import { IMapThunksToProps } from '#RUtils/Types';

import { MainStoreState } from './store';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type MainThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    MainStoreState,
    unknown,
    Action<string>
>;

export const mainThunks = {};

export type MainMapThunksToProps = IMapThunksToProps<typeof mainThunks>;
