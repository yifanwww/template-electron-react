import { Dispatch } from '@reduxjs/toolkit';
import { DependencyList, useMemo } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import { IActionsDestructuring, IThunksDestructuring } from '#RUtils/Redux';

import { GlobalState, globalState } from './global-state';
import { actions } from './slice';
import { StoreState, store } from './store';
import { thunks } from './thunk';

export { actions as mainActions };
export { store as mainStore };
export { thunks as mainThunks };

export type { GlobalState as MainGlobalState };
export type { StoreState as MainStoreState };

/** An custom hook for functional containers. */
export function useMainSelector<TSelected = unknown>(
    selector: (state: StoreState, globalState: GlobalState) => TSelected,
    equalityFn: (left: TSelected, right: TSelected) => boolean = shallowEqual,
): TSelected {
    return useSelector((state: StoreState) => selector(state, globalState), equalityFn);
}

/** Used for the second parameter of `connect` */
export function mapMainDispatchToProps<
    TMapActionsToProps extends IActionsDestructuring<typeof actions>,
    TMapThunksToProps extends IThunksDestructuring<typeof thunks>
>(
    mapActionsToProps: TMapActionsToProps,
    mapThunksToProps: TMapThunksToProps,
): TMapActionsToProps & TMapThunksToProps {
    return { ...mapActionsToProps, ...mapThunksToProps };
}

/** An custom hook for functional containers. */
export function useMainDispatch<
    TActionsDestructuring extends IActionsDestructuring<typeof actions>,
    TThunksDestructuring extends IThunksDestructuring<typeof thunks>
>(
    actionsDestructuring: (dispatch: Dispatch<any>) => TActionsDestructuring,
    thunksDestructuring: (dispatch: Dispatch<any>) => TThunksDestructuring,
    deps: DependencyList | undefined = [],
): TActionsDestructuring & TThunksDestructuring {
    const dispatch = useDispatch();
    return useMemo(
        () => mapMainDispatchToProps(actionsDestructuring(dispatch), thunksDestructuring(dispatch)),
        deps,
    );
}
