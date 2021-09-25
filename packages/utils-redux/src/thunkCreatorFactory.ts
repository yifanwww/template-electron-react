import { IThunk, IThunkAction, IThunkClosure } from './types.IThunk';

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
