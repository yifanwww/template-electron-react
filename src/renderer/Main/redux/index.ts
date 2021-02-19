import {
    IActionsDestructuring,
    IExactlyActionsDestructuring,
    IExactlyThunksDestructuring,
    IThunksDestructuring,
    ReduxHooksFactory,
} from '#RUtils/Redux';

import { GlobalStoreState, StoreState } from './types';
import { globalStore } from './globalStore';
import { actions, store } from './slice';
import { thunks } from './thunk';

export { actions as mainActions };
export { store as mainStore };
export { thunks as mainThunks };

export type { GlobalStoreState as MainGlobalStoreState };
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
    GlobalStoreState
>(actions, thunks, globalStore.getGlobalState);
