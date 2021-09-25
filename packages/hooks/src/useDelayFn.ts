import { useCallback, useRef } from 'react';

/**
 * Hook to generate a delayed execution function.
 * The callback function will be called after a period of time. The timeout timer will be refreshed if it is triggered
 * before the timeout timer expires.
 *
 * @param fn A callback function to be called after a period of time.
 * @param delay The delay in microseconds. Default is `1000`.
 * @returns The trigger.
 */
export function useDelayFn<T extends (...args: never[]) => void>(fn?: T, delay: number = 1000): T {
    const timeoutIdRef = useRef<number>();

    const trigger = useCallback(
        (...args: never[]) => {
            if (timeoutIdRef.current) {
                clearTimeout(timeoutIdRef.current);
            }

            if (fn) {
                timeoutIdRef.current = setTimeout(() => {
                    timeoutIdRef.current = undefined;
                    fn(...args);
                }, delay) as unknown as number;
            }
        },
        [delay, fn],
    );

    return trigger as T;
}
