import { Dispatch } from '@reduxjs/toolkit';
import { DependencyList, useMemo } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import {
    IActions,
    IActionsDestructuring,
    IExactlyActionsDestructuring,
    IExactlyThunksDestructuring,
    IThunks,
    IThunksDestructuring,
} from './IDestructuring';

export function ReduxHooksFactory<
    TActions extends IActions,
    TThunks extends IThunks,
    TStoreState,
    TGlobalState
>(actions: TActions, thunks: TThunks, globalState: TGlobalState) {
    /**
     * An custom hook for functional containers.
     *
     * If you need to take some data from the global state, you could use this hook  instead of
     * importing the global state, to write simpler code. The global state will be passed as the
     * second parameter.
     */
    function useReduxSelector<TSelected = unknown>(
        selector: (state: TStoreState, globalState: TGlobalState) => TSelected,
        equalityFn: (left: TSelected, right: TSelected) => boolean = shallowEqual,
    ): TSelected {
        return useSelector((state: TStoreState) => selector(state, globalState), equalityFn);
    }

    /**
     * An custom hook for functional containers.
     *
     * You can use this hook to write simpler code to get the action functions and thunk functions.
     * This hook uses `useMemo` to avoid changing the action functions and thunk functions while
     * rerendering the containers.
     *
     * You don't need to use `useDispatch` to get a dispatch, the dispatch will be passed as the
     * first parameter. Actions and thunks will be passed as the second parameter.
     */
    function useReduxDispatch<
        TActionsDestructuring extends IActionsDestructuring<TActions>,
        TThunksDestructuring extends IThunksDestructuring<TThunks>
    >(
        actionsDestructuring: (
            dispatch: Dispatch<any>,
            actions: TActions,
        ) => IExactlyActionsDestructuring<TActionsDestructuring, TActions>,
        thunksDestructuring: (
            dispatch: Dispatch<any>,
            thunks: TThunks,
        ) => IExactlyThunksDestructuring<TThunksDestructuring, TThunks>,
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

    return { useReduxDispatch, useReduxSelector };
}
