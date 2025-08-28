import type { UnknownFn } from '@app/common/types';
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
 * @returns The function. The identity of this function will never change.
 */
export function usePersistFn<T extends UnknownFn>(fn: T): T {
    const ref = useRef<PersistFnRef<T>>();
    ref.current ??= {
        fn,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        persistFn: ((...args) => ref.current!.fn(...args)) as T,
    };
    ref.current.fn = fn;
    return ref.current.persistFn;
}
