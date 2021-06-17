import { useEffect } from 'react';

import { useConst } from './useConst';
import { useConstFunction } from './useConstFunction';

export interface IUseSetTimeoutCallbacks {
    readonly setTimeout: (callback: () => void, duration: number) => number;
    readonly clearTimeout: (id: number) => void;
}

/**
 *  Returns a wrapper function for `setTimeout` which automatically handles disposal.
 */
export function useSetTimeout(): IUseSetTimeoutCallbacks {
    const timeoutIds = useConst<Record<number, number>>({});

    // Cleanup function.
    useEffect(
        () => {
            return () => {
                // Here runs only when this component did unmount.
                for (const id of Object.keys(timeoutIds)) {
                    clearTimeout(id as unknown as number);
                }
            };
        },
        // useConst ensures this will never change, but react-hooks/exhaustive-deps doesn't know that
        [timeoutIds],
    );

    const _setTimeout = useConstFunction((callback: () => void, duration: number): number => {
        const id = setTimeout(callback, duration) as unknown as number;

        timeoutIds[id] = 1;

        return id;
    });

    const _clearTimeout = useConstFunction((id: number): void => {
        delete timeoutIds[id];
        clearTimeout(id);
    });

    return {
        setTimeout: _setTimeout,
        clearTimeout: _clearTimeout,
    };
}
