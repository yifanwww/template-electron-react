import { IMapActionsToProps, IMapThunksToProps } from '#RUtils/Redux';

import { mainActions } from './slice';
import { mainThunks } from './thunk';

export function mapMainDispatchToProps<
    MapActionsToProps extends IMapActionsToProps<typeof mainActions>,
    MapThunksToProps extends IMapThunksToProps<typeof mainThunks>
>(
    mapActionsToProps: MapActionsToProps,
    mapThunksToProps: MapThunksToProps,
): MapActionsToProps & MapThunksToProps {
    return { ...mapActionsToProps, ...mapThunksToProps };
}
