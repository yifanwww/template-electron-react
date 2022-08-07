import { useMemo, useRef } from 'react';
import { shallowEqual, useDispatch } from 'react-redux';

import { ReduxActions, DispatchingActions, DispatchingThunks, ReduxThunks } from './types';

/**
 * This hook returns functions which will dispatch the certain actions automatically. You can use this hook to write
 * simpler code rather than use `useDispatch`.
 */
export function useDispatchingActions<TActions extends ReduxActions>(actions: TActions): DispatchingActions<TActions> {
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

        return dispatchingActions as DispatchingActions<TActions>;
    }, [memoActions, dispatch]);
}

/**
 * This hook returns functions which will dispatch the certain thunks automatically. You can use this hook to write
 * simpler code rather than use `useDispatch`.
 */
export function useDispatchingThunks<TThunks extends ReduxThunks>(thunks: TThunks): DispatchingThunks<TThunks> {
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

        for (const thunkName in memoThunks) {
            // The type of thunk doesn't satisfy `AnyAction` but it's valid because we use middleware `redux-thunk`.
            dispatchingThunks[thunkName] = (...args: never[]) => dispatch(memoThunks[thunkName](...args) as never);
        }

        return dispatchingThunks as DispatchingThunks<TThunks>;
    }, [memoThunks, dispatch]);
}
