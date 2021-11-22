import { useEffect, useRef } from 'react';

import { useConstFn } from './useConstFn';

export interface UseSingleTimeoutActions {
    readonly isWorking: () => boolean;
    readonly setTimeout: (callback: () => void, duration?: number) => void;
    readonly clearTimeout: () => void;
}

/**
 *  Returns a simple wrapper function for `setTimeout` which automatically handles disposal.
 */
export function useSingleTimeout(): UseSingleTimeoutActions {
    const timeoutIdRef = useRef<number>();

    // Cleanup function.
    useEffect(() => {
        // Here runs only when this component did unmount. Clear the timeout timer if it exists.
        return () => clearTimeout(timeoutIdRef.current);
    }, []);

    const isWorking = useConstFn(() => timeoutIdRef.current !== undefined);

    const _setTimeout = useConstFn((callback: () => void, duration?: number): void => {
        clearTimeout(timeoutIdRef.current);

        timeoutIdRef.current = setTimeout(() => {
            timeoutIdRef.current = undefined;
            callback();
        }, duration) as unknown as number;
    });

    const _clearTimeout = useConstFn(() => clearTimeout(timeoutIdRef.current));

    return { isWorking, setTimeout: _setTimeout, clearTimeout: _clearTimeout };
}
