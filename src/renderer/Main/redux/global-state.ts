export interface GlobalState {}

/**
 * A global state, the extra of redux store state, used only for performance.
 * Don't change this state directly, please change it only in the dispatch of redux.
 */
export const globalState: GlobalState = {};
