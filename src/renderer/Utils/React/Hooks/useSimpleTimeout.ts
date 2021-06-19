import { useEffect, useRef } from 'react';

import { useConst } from './useConst';

export interface IUseSimpleTimeoutActions {
    readonly setTimeout: (callback: () => void, duration?: number) => void;
    readonly clearTimeout: () => void;
}

/**
 *  Returns a simple wrapper function for `setTimeout` which automatically handles disposal.
 */
export function useSimpleTimeout(): IUseSimpleTimeoutActions {
    const timeoutIdRef = useRef<number>();

    // Cleanup function.
    useEffect(() => {
        // Here runs only when this component did unmount. Clear the timeout timer if it exists.
        return () => clearTimeout(timeoutIdRef.current);
    }, []);

    const actions = useConst<IUseSimpleTimeoutActions>({
        setTimeout: (callback: () => void, duration?: number): void => {
            clearTimeout(timeoutIdRef.current);

            timeoutIdRef.current = setTimeout(callback, duration) as unknown as number;
        },

        clearTimeout: () => clearTimeout(timeoutIdRef.current),
    });

    return actions;
}
