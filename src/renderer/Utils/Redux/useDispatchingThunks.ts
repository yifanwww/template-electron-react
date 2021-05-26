import { useMemo, useRef } from 'react';
import { shallowEqual, useDispatch } from 'react-redux';

import { IThunks, IDispatchedThunks } from './IDispatched';

/**
 * This hook returns functions which will dispatch the certain thunks automatically. You can use this hook to write
 * simpler code rather than use `useDispatch`.
 */
export function useDispatchingThunks<TThunks extends IThunks>(thunks: TThunks): IDispatchedThunks<TThunks> {
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
        const dispatchingThunks: Partial<IDispatchedThunks<TThunks>> = {};

        for (const thunkName in memoThunks)
            (dispatchingThunks[thunkName] as any) = (payload: any) => dispatch(memoThunks[thunkName](payload));

        return dispatchingThunks as IDispatchedThunks<TThunks>;
    }, [memoThunks, dispatch]);
}
