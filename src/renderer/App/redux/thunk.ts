import { Action, ThunkAction } from '@reduxjs/toolkit';

import { IMapThunksToProps } from '#RUtils/Types';

import { AppStoreState } from './store';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppStoreState, unknown, Action<string>>;

export const appThunks = {};

export type AppMapThunksToProps = IMapThunksToProps<typeof appThunks>;
