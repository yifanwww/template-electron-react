import { DependencyList, useMemo } from 'react';

import { IMapActionsToProps, IMapThunksToProps } from '#RUtils/Redux';

import { actions } from './slice';
import { StoreState, store } from './store';
import { thunks } from './thunk';

export { actions as mainActions };
export { store as mainStore };
export type { StoreState as MainStoreState };
export { thunks as mainThunks };

/** Used for the second parameter of `connect` */
export function mapMainDispatchToProps<
    MapActionsToProps extends IMapActionsToProps<typeof actions>,
    MapThunksToProps extends IMapThunksToProps<typeof thunks>
>(
    mapActionsToProps: MapActionsToProps,
    mapThunksToProps: MapThunksToProps,
): MapActionsToProps & MapThunksToProps {
    return { ...mapActionsToProps, ...mapThunksToProps };
}

/** An custom hook for functional containers. */
export function useMainDispatchFunctions<
    MapActionsToProps extends IMapActionsToProps<typeof actions>,
    MapThunksToProps extends IMapThunksToProps<typeof thunks>
>(
    mapActionsToProps: MapActionsToProps,
    mapThunksToProps: MapThunksToProps,
    deps: DependencyList | undefined = [],
): MapActionsToProps & MapThunksToProps {
    return useMemo(() => mapMainDispatchToProps(mapActionsToProps, mapThunksToProps), deps);
}
