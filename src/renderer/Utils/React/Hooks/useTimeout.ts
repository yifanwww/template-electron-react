import { useEffect } from 'react';

import { useConst } from './useConst';

export interface IUseTimeoutActions {
    readonly setTimeout: (callback: () => void, duration?: number) => number;
    readonly clearTimeout: (id: number) => void;
}

/**
 *  Returns a wrapper function for `setTimeout` which automatically handles disposal.
 */
export function useTimeout(): IUseTimeoutActions {
    const timeoutIds = useConst<Record<number, number>>({});

    // Cleanup function.
    useEffect(
        () => {
            // Here runs only when this component did unmount.
            return () => {
                // Clear the timeout timers if they exist.
                for (const id of Object.keys(timeoutIds)) clearTimeout(id as unknown as number);
            };
        },
        // useConst ensures this will never change, but `react-hooks/exhaustive-deps` doesn't know that.
        [timeoutIds],
    );

    const actions = useConst<IUseTimeoutActions>({
        setTimeout: (callback: () => void, duration?: number): number => {
            const id = setTimeout(callback, duration) as unknown as number;
            timeoutIds[id] = 1;
            return id;
        },

        clearTimeout: (id: number): void => {
            delete timeoutIds[id];
            clearTimeout(id);
        },
    });

    return actions;
}
