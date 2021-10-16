import { IThunk, IThunkAction, IThunkActionWithArgs } from './types.IThunk';

export function thunkCreatorFactory<State>() {
    return function createThunk<ReturnType, ThunkArgs extends unknown[]>(
        thunk: IThunk<ReturnType, State, ThunkArgs>,
    ): IThunkActionWithArgs<ReturnType, State, ThunkArgs> {
        function thunkWithArgs(...thunkArgs: ThunkArgs): IThunkAction<ReturnType, State> {
            return (dispatch, getState) => thunk(dispatch, getState, ...thunkArgs);
        }

        return thunkWithArgs as never;
    };
}
