import { ReduxThunkAction, ThunkFn, ThunkArgsAction } from './types';

export function thunkCreatorFactory<S>() {
    return function createThunk<R, Args extends unknown[]>(thunk: ThunkFn<R, S, Args>): ThunkArgsAction<R, S, Args> {
        function thunkWithArgs(...thunkArgs: Args): ReduxThunkAction<R, S> {
            return (dispatch, getState) => thunk(dispatch, getState, ...thunkArgs);
        }

        return thunkWithArgs as never;
    };
}
