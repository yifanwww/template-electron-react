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
        return () => window.clearTimeout(timeoutIdRef.current);
    }, []);

    const isWorking = useConstFn(() => timeoutIdRef.current !== undefined);

    const setTimeout = useConstFn((callback: () => void, duration?: number): void => {
        window.clearTimeout(timeoutIdRef.current);

        timeoutIdRef.current = window.setTimeout(() => {
            timeoutIdRef.current = undefined;
            callback();
        }, duration);
    });

    const clearTimeout = useConstFn(() => window.clearTimeout(timeoutIdRef.current));

    return { isWorking, setTimeout, clearTimeout };
}
