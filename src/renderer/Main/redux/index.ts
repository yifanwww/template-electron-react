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

/**
 * An custom hook for functional containers.
 *
 * If you need to take some data from the global state, you could use this hook  instead of
 * importing the global state, to write simpler code. The global state will be passed as the second
 * parameter.
 */
export function useMainSelector<TSelected = unknown>(
    selector: (state: StoreState, globalState: GlobalState) => TSelected,
    equalityFn: (left: TSelected, right: TSelected) => boolean = shallowEqual,
): TSelected {
    return useSelector((state: StoreState) => selector(state, globalState), equalityFn);
}

type IActions = typeof actions;
type IThunks = typeof thunks;

/** Used for the second parameter of `connect` */
export function mapMainDispatchToProps<
    TMapActionsToProps extends IActionsDestructuring<IActions>,
    TMapThunksToProps extends IThunksDestructuring<IThunks>
>(
    mapActionsToProps: TMapActionsToProps,
    mapThunksToProps: TMapThunksToProps,
): TMapActionsToProps & TMapThunksToProps {
    return { ...mapActionsToProps, ...mapThunksToProps };
}

/**
 * An custom hook for functional containers.
 *
 * You can use this hook to write simpler code to get the action functions and thunk functions. This
 * hook uses `useMemo` to avoid changing the action functions and thunk functions while rerendering
 * the containers.
 *
 * You don't need to use `useDispatch` to get a dispatch, the dispatch will be passed as the first
 * parameter. Actions and thunks will be passed as the second parameter.
 */
export function useMainDispatch<
    TActionsDestructuring extends IActionsDestructuring<IActions>,
    TThunksDestructuring extends IThunksDestructuring<IThunks>
>(
    actionsDestructuring: (dispatch: Dispatch<any>, actions: IActions) => TActionsDestructuring,
    thunksDestructuring: (dispatch: Dispatch<any>, thunks: IThunks) => TThunksDestructuring,
    deps: DependencyList | undefined = [],
): TActionsDestructuring & TThunksDestructuring {
    const dispatch = useDispatch();
    return useMemo(
        () => ({
            ...actionsDestructuring(dispatch, actions),
            ...thunksDestructuring(dispatch, thunks),
        }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        deps,
    );
}
