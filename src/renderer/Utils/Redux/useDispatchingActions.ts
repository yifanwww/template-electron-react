import { useMemo, useRef } from 'react';
import { shallowEqual, useDispatch } from 'react-redux';

import { IActions, IDispatchedActions } from './IDispatched';

/**
 * This hook returns functions which will dispatch the certain actions automatically. You can use this hook to write
 * simpler code rather than use `useDispatch`.
 */
export function useDispatchingActions<TActions extends IActions>(actions: TActions): IDispatchedActions<TActions> {
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
        const dispatchingActions: Partial<IDispatchedActions<TActions>> = {};

        for (const actionName in memoActions)
            (dispatchingActions[actionName] as any) = (payload: any) => dispatch(memoActions[actionName](payload));

        return dispatchingActions as IDispatchedActions<TActions>;
    }, [memoActions, dispatch]);
}
