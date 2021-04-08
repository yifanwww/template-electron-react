import { DependencyList, useMemo } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import {
    ActionsDestructuring,
    IActions,
    IActionsDestructuring,
    IThunks,
    IThunksDestructuring,
    ThunksDestructuring,
} from './IDestructuring';

export function ReduxHooksFactory<TActions extends IActions, TThunks extends IThunks, TStoreState, TGlobalState>(
    actions: TActions,
    thunks: TThunks,
    getGlobalState: () => TGlobalState,
) {
    /**
     * An custom hook for functional containers.
     *
     * If you need to take some data from the global state, you could use this hook  instead of importing the global
     * state, to write simpler code. The global state will be passed as the second parameter.
     */
    function useReduxSelector<TSelected = unknown>(
        selector: (state: TStoreState, globalState: TGlobalState) => TSelected,
        equalityFn: (left: TSelected, right: TSelected) => boolean = shallowEqual,
    ): TSelected {
        return useSelector((state: TStoreState) => selector(state, getGlobalState()), equalityFn);
    }

    /**
     * An custom hook for functional containers.
     *
     * You can use this hook to write simpler code to get the action functions. This hook uses `useMemo` to avoid
     * changing the action functions while rerendering the containers.
     *
     * You don't need to use `useDispatch` to get a dispatch, the dispatch will be passed as the first parameter.
     * Actions will be passed as the second parameter.
     */
    function useReduxActionsDispatch<TActionsDestructuring extends IActionsDestructuring<TActions>>(
        actionsDestructuring: ActionsDestructuring<TActions, TActionsDestructuring>,
        deps: DependencyList | undefined = [],
    ): TActionsDestructuring {
        const dispatch = useDispatch();
        return useMemo(
            () => ({ ...actionsDestructuring(dispatch, actions) }),
            // eslint-disable-next-line react-hooks/exhaustive-deps
            deps,
        );
    }

    /**
     * An custom hook for functional containers.
     *
     * You can use this hook to write simpler code to get the thunk functions. This hook uses `useMemo` to avoid
     * changing the thunk functions while rerendering the containers.
     *
     * You don't need to use `useDispatch` to get a dispatch, the dispatch will be passed as the first parameter.
     * Thunks will be passed as the second parameter.
     */
    function useReduxThunksDispatch<TThunksDestructuring extends IThunksDestructuring<TThunks>>(
        thunksDestructuring: ThunksDestructuring<TThunks, TThunksDestructuring>,
        deps: DependencyList | undefined = [],
    ): TThunksDestructuring {
        const dispatch = useDispatch();
        return useMemo(
            () => ({ ...thunksDestructuring(dispatch, thunks) }),
            // eslint-disable-next-line react-hooks/exhaustive-deps
            deps,
        );
    }

    /**
     * An custom hook for functional containers.
     *
     * If you need to get both the action functions and thunk functions, you can use this hook instead of using both
     * `useReduxActionsDispatch` and `useReduxThunksDispatch` hooks. This hook uses `useMemo` to avoid changing the
     * action functions and thunk functions while rerendering the containers.
     *
     * You don't need to use `useDispatch` to get a dispatch, the dispatch will be passed as the first parameter.
     * Actions and thunks will be passed as the second parameter.
     */
    function useReduxDispatch<
        TActionsDestructuring extends IActionsDestructuring<TActions>,
        TThunksDestructuring extends IThunksDestructuring<TThunks>
    >(
        actionsDestructuring: ActionsDestructuring<TActions, TActionsDestructuring>,
        thunksDestructuring: ThunksDestructuring<TThunks, TThunksDestructuring>,
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

    return {
        useReduxSelector,
        useReduxActionsDispatch,
        useReduxThunksDispatch,
        useReduxDispatch,
    };
}
