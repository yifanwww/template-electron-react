import { ReduxThunkAction, ThunkFn } from './types';

export function thunkCreatorFactory<State>() {
    return function createThunk<ReturnType, Args extends unknown[]>(thunk: ThunkFn<ReturnType, State, Args>) {
        return function thunkWithArgs(...thunkArgs: Args): ReduxThunkAction<ReturnType, State> {
            return (dispatch, getState) => thunk(dispatch, getState, ...thunkArgs);
        };
    };
}
