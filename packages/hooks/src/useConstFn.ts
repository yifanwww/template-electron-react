import { useRef } from 'react';

/**
 * Hook to initialize and return a constant function.
 * Unlike `React.useCallback`, this is guaranteed to always return the same function.
 * This is similar to setting a private member in a class constructor.
 *
 * If the value should ever change based on dependencies, use `React.useCallback` instead.
 *
 * @param initialFn Initial function.
 * @returns The function. The identity of this function will always be the same.
 */
export function useConstFn<T extends (...args: never[]) => unknown>(initialFn: T): T {
    // Use useRef to store the function because it's the least expensive built-in hook that works here.
    const ref = useRef<T>();
    if (ref.current === undefined) {
        ref.current = initialFn;
    }
    return ref.current;
}
