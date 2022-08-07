import { useRef } from 'react';

interface PersistFnRef<T> {
    fn: T;
    persistFn: T;
}

/**
 * Hook to return a persist function.
 * Unlike `React.useCallback`, this is guaranteed to always return the same function,
 * and no need to use `React.useMemo` or `React.useCallback` to warp the dependencies.
 *
 * @param fn Function that hopes to keep the same.
 * @returns The function. The identity of this function will always be the same.
 */
export function usePersistFn<T extends UnknownFn>(fn: T): T {
    const ref = useRef<PersistFnRef<T>>();
    if (!ref.current) {
        ref.current = {
            fn,
            persistFn: ((...args) => ref.current!.fn(...args)) as T,
        };
    }
    ref.current.fn = fn;
    return ref.current.persistFn;
}
