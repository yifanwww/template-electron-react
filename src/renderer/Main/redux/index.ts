import {
    IActionsDestructuring,
    IExactlyActionsDestructuring,
    IExactlyThunksDestructuring,
    IThunksDestructuring,
    ReduxHooksFactory,
} from '#RUtils/Redux';

import { GlobalState, globalState } from './global-state';
import { actions } from './slice';
import { StoreState, store } from './store';
import { thunks } from './thunk';

export { actions as mainActions };
export { store as mainStore };
export { thunks as mainThunks };

export type { GlobalState as MainGlobalState };
export type { StoreState as MainStoreState };

type Actions = typeof actions;
type Thunks = typeof thunks;

/** Used for the second parameter of `connect` */
export function mapMainDispatchToProps<
    TMapActionsToProps extends IActionsDestructuring<Actions>,
    TMapThunksToProps extends IThunksDestructuring<Thunks>
>(
    mapActionsToProps: IExactlyActionsDestructuring<TMapActionsToProps, Actions>,
    mapThunksToProps: IExactlyThunksDestructuring<TMapThunksToProps, Thunks>,
): TMapActionsToProps & TMapThunksToProps {
    return { ...mapActionsToProps, ...mapThunksToProps };
}

export const { useReduxDispatch: useMainDispatch, useReduxSelector: useMainSelector } = ReduxHooksFactory<
    typeof actions,
    typeof thunks,
    StoreState,
    GlobalState
>(actions, thunks, globalState);
