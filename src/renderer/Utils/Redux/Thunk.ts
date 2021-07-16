import { AnyAction, ThunkAction, ThunkDispatch } from '@reduxjs/toolkit';

export type IThunkAction<ReturnType, State> = ThunkAction<ReturnType, State, unknown, AnyAction>;

export type IThunk<ReturnType, State, ThunkArgs extends unknown[]> = (
    dispatch: ThunkDispatch<State, never, AnyAction>,
    getState: () => State,
    ...thunkArgs: ThunkArgs
) => ReturnType;

export type IThunkClosure<ReturnType, State, ThunkArgs extends unknown[]> = ThunkArgs extends undefined
    ? () => IThunkAction<ReturnType, State>
    : (...thunkArgs: ThunkArgs) => IThunkAction<ReturnType, State>;

export function thunkCreatorFactory<State>() {
    return function createThunk<ReturnType, ThunkArgs extends unknown[]>(
        thunk: IThunk<ReturnType, State, ThunkArgs>,
    ): IThunkClosure<ReturnType, State, ThunkArgs> {
        function thunkClosure(...thunkArgs: ThunkArgs): IThunkAction<ReturnType, State> {
            return (dispatch, getState) => thunk(dispatch, getState, ...thunkArgs);
        }

        return thunkClosure as never;
    };
}
