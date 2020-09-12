import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

export const Store = configureStore({
    reducer: {}
});

export type RootState = ReturnType<typeof Store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
