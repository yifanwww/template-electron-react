import { useEffect } from 'react';

import { useConst } from './useConst';
import { useConstFn } from './useConstFn';

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
    useEffect(
        () => {
            // Here runs only when this component did unmount.
            return () => {
                // Clear the timeout timers if they exist.
                for (const id of Object.keys(timeoutIds)) window.clearTimeout(id as unknown as number);
            };
        },
        // useConst ensures this will never change, but `react-hooks/exhaustive-deps` doesn't know that.
        [timeoutIds],
    );

    const setTimeout = useConstFn((callback: () => void, duration?: number): number => {
        const id = window.setTimeout(callback, duration) as unknown as number;
        timeoutIds[id] = 1;
        return id;
    });

    const clearTimeout = useConstFn((id: number): void => {
        delete timeoutIds[id];
        window.clearTimeout(id);
    });

    return { setTimeout, clearTimeout };
}
