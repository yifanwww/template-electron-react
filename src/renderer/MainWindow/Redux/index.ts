import { Contained } from '#shared/TypeUtils';
import { IDispatchedActions, IDispatchedThunks } from '#RUtils/Redux';

import { GlobalStoreState, StoreState } from './types';
import { actions, store } from './slice';
import { thunks } from './thunk';

export { actions as mainActions };
export { store as mainStore };
export { thunks as mainThunks };

export type { GlobalStoreState as MainGlobalStoreState };
export type { StoreState as MainStoreState };

export * from './Hooks';

/** Used for the second parameter of `connect` */
export function mapMainDispatchToProps<
    TMapActionsToProps extends Partial<IDispatchedActions<typeof actions>>,
    TMapThunksToProps extends Partial<IDispatchedThunks<typeof thunks>>
>(
    mapActionsToProps: Contained<TMapActionsToProps, typeof actions>,
    mapThunksToProps: Contained<TMapThunksToProps, typeof thunks>,
): TMapActionsToProps & TMapThunksToProps {
    return { ...mapActionsToProps, ...mapThunksToProps };
}
