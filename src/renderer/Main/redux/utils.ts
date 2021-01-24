import { IMapActionsToProps, IMapThunksToProps } from '#RUtils/Redux';

import { mainActions } from './slice';
import { mainThunks } from './thunk';

export function mapMainDispatchToProps<
    T1 extends IMapActionsToProps<typeof mainActions>,
    T2 extends IMapThunksToProps<typeof mainThunks>
>(mapActionsToProps: T1, mapThunksToProps: T2): T1 & T2 {
    return { ...mapActionsToProps, ...mapThunksToProps };
}
