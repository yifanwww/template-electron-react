import { useCallback, useRef } from 'react';

/**
 * Hook to generate a delayed execution function.
 * The callback function will be called after a period of time. The timeout timer will be refreshed if it is triggered
 * before the timeout timer expires.
 *
 * @param func A callback function to be called after a period of time.
 * @param delay The delay in microseconds. Default is `1000`.
 * @returns The trigger.
 */
export function useDelayFn(func?: () => void, delay: number = 1000): () => void {
    const timeoutIdRef = useRef<number>();

    const _delay = delay >= 0 ? delay : 0;

    const trigger = useCallback(() => {
        if (timeoutIdRef.current) {
            clearTimeout(timeoutIdRef.current);
        }

        if (func) {
            timeoutIdRef.current = setTimeout(() => {
                timeoutIdRef.current = undefined;
                func();
            }, _delay) as unknown as number;
        }
    }, [_delay, func]);

    return trigger;
}
