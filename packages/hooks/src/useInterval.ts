import { useEffect } from 'react';

import { useConst } from './useConst';
import { useConstFn } from './useConstFn';

export interface UseIntervalActions {
    readonly setInterval: (callback: () => void, duration?: number) => number;
    readonly clearInterval: (id: number) => void;
}

/**
 *  Returns a wrapper function for `setInterval` which automatically handles disposal.
 */
export function useInterval(): UseIntervalActions {
    const intervalIds = useConst<Record<number, number>>({});

    // Cleanup function.
    useEffect(
        () => {
            // Here runs only when this component did unmount.
            return () => {
                // Clear the interval timers if they exist.
                for (const id of Object.keys(intervalIds)) window.clearInterval(id as unknown as number);
            };
        },
        // useConst ensures this will never change, but `react-hooks/exhaustive-deps` doesn't know that.
        [intervalIds],
    );

    const setInterval = useConstFn((callback: () => void, duration?: number): number => {
        const id = window.setInterval(callback, duration) as unknown as number;
        intervalIds[id] = 1;
        return id;
    });

    const clearInterval = useConstFn((id: number): void => {
        delete intervalIds[id];
        window.clearInterval(id);
    });

    return { setInterval, clearInterval };
}
