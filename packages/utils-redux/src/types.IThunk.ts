import { AnyAction, ThunkAction, ThunkDispatch } from '@reduxjs/toolkit';

export type IThunkAction<ReturnType, State> = ThunkAction<ReturnType, State, unknown, AnyAction>;

export type IThunk<ReturnType, State, ThunkArgs extends unknown[]> = (
    dispatch: ThunkDispatch<State, never, AnyAction>,
    getState: () => State,
    ...thunkArgs: ThunkArgs
) => ReturnType;

export type IThunkActionWithArgs<ReturnType, State, ThunkArgs extends unknown[]> = ThunkArgs extends undefined
    ? () => IThunkAction<ReturnType, State>
    : (...thunkArgs: ThunkArgs) => IThunkAction<ReturnType, State>;
