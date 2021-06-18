import { useCallback, useRef } from 'react';

/**
 * Hook to generate a delayed execution function.
 * The callback function will be called after a period of time. The timeout timer will be refreshed if it is triggered
 * before the timeout timer expires.
 *
 * @param func A callback function to be called after a period of time.
 * @param delay The delay in microseconds.
 * @returns The trigger.
 */
export function useDelayFn(func: () => void, delay: number): () => void {
    const timeoutIdRef = useRef<number>();

    const onTimeout = useCallback(() => {
        timeoutIdRef.current = undefined;
        func();
    }, [func]);

    const trigger = useCallback(() => {
        if (timeoutIdRef.current) {
            clearTimeout(timeoutIdRef.current);
        }

        timeoutIdRef.current = setTimeout(onTimeout, delay >= 0 ? delay : 0) as unknown as number;
    }, [delay, onTimeout]);

    return trigger;
}
