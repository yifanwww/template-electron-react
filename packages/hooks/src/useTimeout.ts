import { useCallback, useEffect } from 'react';

import { useConst } from './useConst';

export interface UseTimeoutActions {
    readonly setTimeout: (callback: () => void, duration?: number) => number;
    readonly clearTimeout: (id: number) => void;
}

/**
 *  Returns a wrapper function for `setTimeout` which automatically handles disposal.
 */
export function useTimeout(): UseTimeoutActions {
    const timeoutIds = useConst<Record<number, number>>({});

    // Cleanup function.
    useEffect(() => {
        // Here runs only when this component did unmount.
        return () => {
            // Clear the timeout timers if they exist.
            for (const id of Object.keys(timeoutIds)) window.clearTimeout(id as unknown as number);
        };
    }, [timeoutIds]);

    const setTimeout = useCallback(
        (callback: () => void, duration?: number): number => {
            const id = window.setTimeout(callback, duration) as unknown as number;
            timeoutIds[id] = 1;
            return id;
        },
        [timeoutIds],
    );

    const clearTimeout = useCallback(
        (id: number): void => {
            delete timeoutIds[id];
            window.clearTimeout(id);
        },
        [timeoutIds],
    );

    return { setTimeout, clearTimeout };
}
