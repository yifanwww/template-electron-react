import { useRef } from 'react';

import { useConstFn } from './useConstFn';

/**
 * Hook to return a persist function.
 * Unlike `React.useCallback`, this is guaranteed to always return the same function,
 * and no need to use `React.useMemo` or `React.useCallback` to warp the dependencies.
 *
 * @param fn Function that hopes to keep the same.
 * @returns The function. The identity of this function will always be the same.
 */
export function usePersistFn<T extends (...args: never[]) => unknown>(fn: T): T {
    const ref = useRef<T>(fn);
    ref.current = fn;
    return useConstFn((...args: never[]) => ref.current(...args)) as never;
}
