import { useMemo, useRef } from 'react';
import { shallowEqual, useDispatch } from 'react-redux';

import { IActions, IDispatchingActions, IDispatchingThunks, IThunks } from './types';

/**
 * This hook returns functions which will dispatch the certain actions automatically. You can use this hook to write
 * simpler code rather than use `useDispatch`.
 */
export function useDispatchingActions<TActions extends IActions>(actions: TActions): IDispatchingActions<TActions> {
    const actionsRef = useRef<TActions>();

    const memoActions = useMemo(() => {
        if (actionsRef.current && shallowEqual(actionsRef.current, actions)) {
            return actionsRef.current;
        } else {
            actionsRef.current = actions;
            return actions;
        }
    }, [actions]);

    const dispatch = useDispatch();

    return useMemo(() => {
        const dispatchingActions: Record<string, Function> = {};

        for (const actionName in memoActions)
            dispatchingActions[actionName] = (payload: unknown) => dispatch(memoActions[actionName](payload));

        return dispatchingActions as IDispatchingActions<TActions>;
    }, [memoActions, dispatch]);
}

/**
 * This hook returns functions which will dispatch the certain thunks automatically. You can use this hook to write
 * simpler code rather than use `useDispatch`.
 */
export function useDispatchingThunks<TThunks extends IThunks>(thunks: TThunks): IDispatchingThunks<TThunks> {
    const thunksRef = useRef<TThunks>();

    const memoThunks = useMemo(() => {
        if (thunksRef.current && shallowEqual(thunksRef.current, thunks)) {
            return thunksRef.current;
        } else {
            thunksRef.current = thunks;
            return thunks;
        }
    }, [thunks]);

    const dispatch = useDispatch();

    return useMemo(() => {
        const dispatchingThunks: Record<string, Function> = {};

        for (const thunkName in memoThunks)
            dispatchingThunks[thunkName] = (...args: never[]) => dispatch(memoThunks[thunkName](...args));

        return dispatchingThunks as IDispatchingThunks<TThunks>;
    }, [memoThunks, dispatch]);
}
