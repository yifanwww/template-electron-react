import { useRef } from 'react';

/**
 * Hook to initialize and return a constant function.
 * Unlike `React.useCallback`, this is guaranteed to always return the same function.
 * This is similar to setting a private member in a class constructor.
 *
 * If the value should ever change based on dependencies, use `React.useCallback` instead.
 *
 * If the value should ever change based on dependencies but don't want to use `React.useMemo` or `React.useCallback`
 * to wrap the dependencies, use `usePersistFn` instead.
 *
 * @param initialFn Initial function.
 * @returns The function. The identity of this function will always be the same.
 */
export function useConstFn<T extends (...args: never[]) => unknown>(initialFn: T): T {
    // Use useRef to store the function because it's the least expensive built-in hook that works here.
    return useRef<T>(initialFn).current;
}
