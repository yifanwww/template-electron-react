import { Action, AnyAction, ThunkDispatch } from '@reduxjs/toolkit';

/**
 * Edited from `ThunkAction` of `@reduxjs/toolkit`.
 */
export type IThunkAction<R, S, E, A extends Action> = (
    dispatch: ThunkDispatch<S, E, A>,
    getState: () => S,
    thunkArgument: E,
) => R;

export type IThunk<ReturnType, State, ThunkArgument> = IThunkAction<ReturnType, State, ThunkArgument, AnyAction>;

export type IThunkClosure<ReturnType, State, ThunkArgument> = ThunkArgument extends undefined
    ? () => IThunk<ReturnType, State, unknown>
    : (thunkArgument: ThunkArgument) => IThunk<ReturnType, State, ThunkArgument>;

export function thunkCreatorFactory<State>() {
    return function createThunk<ReturnType, ThunkArgument = undefined>(
        thunk: IThunk<ReturnType, State, ThunkArgument>,
    ): IThunkClosure<ReturnType, State, ThunkArgument> {
        function thunkClosure(thunkArgument: ThunkArgument): IThunk<ReturnType, State, ThunkArgument> {
            return (dispatch, getState) => thunk(dispatch, getState, thunkArgument);
        }

        return thunkClosure as IThunkClosure<ReturnType, State, ThunkArgument>;
    };
}
