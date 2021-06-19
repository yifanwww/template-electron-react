import { useEffect, useRef } from 'react';

import { useConst } from './useConst';

export interface IUseSimpleIntervalActions {
    readonly setInterval: (callback: () => void, duration?: number) => void;
    readonly clearInterval: () => void;
}

/**
 *  Returns a simple wrapper function for `setInterval` which automatically handles disposal.
 */
export function useSimpleInterval(): IUseSimpleIntervalActions {
    const intervalIdRef = useRef<number>();

    // Cleanup function.
    useEffect(() => {
        // Here runs only when this component did unmount. Clear the interval timer if it exists.
        return () => clearInterval(intervalIdRef.current);
    }, []);

    const actions = useConst<IUseSimpleIntervalActions>({
        setInterval: (callback: () => void, duration?: number): void => {
            clearInterval(intervalIdRef.current);

            intervalIdRef.current = setInterval(callback, duration) as unknown as number;
        },

        clearInterval: () => clearInterval(intervalIdRef.current),
    });

    return actions;
}
