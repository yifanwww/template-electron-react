import { AnyAction, Dispatch, ThunkDispatch } from '@reduxjs/toolkit';
import { useMemo } from 'react';
import { shallowEqual, useSelector } from 'react-redux';

import { IActions, IDispatchedActions, IDispatchedThunks, IThunks } from './IDispatched';

export function ReduxHooksFactory<TActions extends IActions, TThunks extends IThunks, TStoreState>(
    actions: TActions,
    thunks: TThunks,
    dispatch: Dispatch<any> & ThunkDispatch<TStoreState, unknown, AnyAction>,
) {
    function _generateDispatchedActions() {
        const dispatchedActions: Partial<IDispatchedActions<TActions>> = {};

        for (const actionName in actions)
            (dispatchedActions[actionName] as any) = (payload: any) => dispatch(actions[actionName](payload));

        return dispatchedActions as IDispatchedActions<TActions>;
    }

    function _generateDispatchedThunks() {
        const dispatchedThunks: Partial<IDispatchedThunks<TThunks>> = {};

        for (const thunkName in thunks)
            (dispatchedThunks[thunkName] as any) = (...args: any[]) => dispatch(thunks[thunkName](...args));

        return dispatchedThunks as IDispatchedThunks<TThunks>;
    }

    const dispatchedActions = _generateDispatchedActions();
    const dispatchedThunks = _generateDispatchedThunks();

    /**
     * An custom hook for functional containers.
     *
     * If you need to take some data from the global state, you could use this hook instead of importing the global
     * state, to write simpler code. The global state will be passed as the second parameter.
     */
    function useReduxSelector<TSelected = unknown>(
        selector: (state: TStoreState) => TSelected,
        equalityFn: (left: TSelected, right: TSelected) => boolean = shallowEqual,
    ): TSelected {
        return useSelector(selector, equalityFn);
    }

    /**
     * An custom hook for functional containers.
     *
     * This hook returns functions which will dispatch the certain actions automatically. You can use this hook to write
     * simpler code rather than use `useDispatch`.
     */
    function useReduxDispatchedActions() {
        return useMemo<IDispatchedActions<TActions>>(() => dispatchedActions, []);
    }

    /**
     * An custom hook for functional containers.
     *
     * This hook returns functions which will dispatch the certain thunks automatically. You can use this hook to write
     * simpler code rather than use `useDispatch`.
     */
    function useReduxDispatchedThunks() {
        return useMemo<IDispatchedThunks<TThunks>>(() => dispatchedThunks, []);
    }

    return {
        useReduxSelector,
        useReduxDispatchedActions,
        useReduxDispatchedThunks,
    };
}
