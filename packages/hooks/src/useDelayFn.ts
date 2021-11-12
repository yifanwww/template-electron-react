import { useCallback } from 'react';

import { useSingleTimeout } from './useSingleTimeout';

/**
 * Hook to generate a delayed execution function.
 * The callback function will be called after a period of time. The timeout timer will be refreshed if it is triggered
 * before the timeout timer expires.
 *
 * @param fn A callback function to be called after a period of time.
 * @param delay The delay in microseconds. Default is `1000`.
 * @returns The trigger.
 */
export function useDelayFn<T extends UnknownFn>(fn?: T, delay: number = 1000): T {
    const { clearTimeout, setTimeout } = useSingleTimeout();

    const _fn = useCallback(
        (...args: never[]) => {
            clearTimeout();

            if (fn) {
                setTimeout(() => fn(...args), delay) as unknown as number;
            }
        },
        [clearTimeout, delay, fn, setTimeout],
    );

    return _fn as T;
}
