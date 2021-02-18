export interface GlobalState {}

/**
 * The global state, the extra state of Redux store, is used only for performance.
 *
 * `@reduxjs/toolkit` use `immer` to let you write simpler immutable updates with normal mutative code, but if your
 * Redux store is huge, `immer` will take a lot of time to detect mutations. You can move your huge date into this
 * global state to avoid the time cost.
 *
 * According to https://react-redux.js.org/api/hooks#useselector, '`useSelector()` will also subscribe to the Redux
 * store, and run your selector whenever an action is dispatched.'
 *
 * According to https://react-redux.js.org/api/connect#state, 'If your `mapStateToProps` function is declared as taking
 * one parameter, it will be called whenever the store state changes, and given the store state as the only parameter.'
 *
 * If you only use functional containers (which means you only use `useSelector` to subscribe to the Redux store), you
 * don't need to set a variable in Redux store as a flag to tell containers to rerender themselves.
 *
 * Don't change the global state directly, please change it only in the reducers of Redux.
 */
export const globalState: GlobalState = {};

export const getGlobalState = () => globalState;
