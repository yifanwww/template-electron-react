import { Action, ThunkAction } from '@reduxjs/toolkit';

import { IMapThunksToProps } from '#RendererUtils/Types';

import { StoreState } from './store';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type AppThunk<ReturnType = void> = ThunkAction<ReturnType, StoreState, unknown, Action<string>>;

export const thunk = {};

export type MapThunksToProps = IMapThunksToProps<typeof thunk>;
