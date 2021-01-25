import { DependencyList, useMemo } from 'react';

import { IMapActionsToProps, IMapThunksToProps } from '#RUtils/Redux';

import { mainActions } from './slice';
import { mainThunks } from './thunk';

/** Used for the second parameter of `connect` */
export function mapMainDispatchToProps<
    MapActionsToProps extends IMapActionsToProps<typeof mainActions>,
    MapThunksToProps extends IMapThunksToProps<typeof mainThunks>
>(
    mapActionsToProps: MapActionsToProps,
    mapThunksToProps: MapThunksToProps,
): MapActionsToProps & MapThunksToProps {
    return { ...mapActionsToProps, ...mapThunksToProps };
}

/** An custom hook for functional containers. */
export function useMainDispatchFunctions<
    MapActionsToProps extends IMapActionsToProps<typeof mainActions>,
    MapThunksToProps extends IMapThunksToProps<typeof mainThunks>
>(
    mapActionsToProps: MapActionsToProps,
    mapThunksToProps: MapThunksToProps,
    deps?: DependencyList,
): MapActionsToProps & MapThunksToProps {
    return useMemo(() => mapMainDispatchToProps(mapActionsToProps, mapThunksToProps), deps);
}
