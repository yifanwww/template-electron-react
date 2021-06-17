import { useEffect } from 'react';

import { useConst } from './useConst';
import { useConstFunction } from './useConstFunction';

export interface IUseSetIntervalCallbacks {
    readonly setInterval: (callback: () => void, duration: number) => number;
    readonly clearInterval: (id: number) => void;
}

/**
 *  Returns a wrapper function for `setInterval` which automatically handles disposal.
 */
export function useSetInterval(): IUseSetIntervalCallbacks {
    const intervalIds = useConst<Record<number, number>>({});

    // Cleanup function.
    useEffect(
        () => {
            return () => {
                // Here runs only when this component did unmount.
                for (const id of Object.keys(intervalIds)) {
                    clearInterval(id as unknown as number);
                }
            };
        },
        // useConst ensures this will never change, but react-hooks/exhaustive-deps doesn't know that
        [intervalIds],
    );

    const _setInterval = useConstFunction((callback: () => void, duration: number): number => {
        const id = setInterval(callback, duration) as unknown as number;

        intervalIds[id] = 1;

        return id;
    });

    const _clearInterval = useConstFunction((id: number): void => {
        delete intervalIds[id];
        clearInterval(id);
    });

    return {
        setInterval: _setInterval,
        clearInterval: _clearInterval,
    };
}
