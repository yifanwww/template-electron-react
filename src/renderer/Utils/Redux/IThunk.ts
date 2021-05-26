import { AnyAction, ThunkAction } from '@reduxjs/toolkit';

export type IThunk<ReturnType, State, ExtraArgument> = ThunkAction<ReturnType, State, ExtraArgument, AnyAction>;
export type IAsyncThunk<ReturnType, State, ExtraArgument> = IThunk<Promise<ReturnType>, State, ExtraArgument>;
