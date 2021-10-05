import { useEffect, useRef } from 'react';

/**
 * Hook which synchronously executes a callback when the component is about to unmount.
 *
 * @param callback Function to call during unmount.
 */
export function useUnmount(callback: () => void) {
    const unmountRef = useRef(callback);

    // Update the ref each render so that the latest callback will be invoked if it changes.
    unmountRef.current = callback;

    useEffect(
        () => () => {
            unmountRef.current?.();
        },
        [],
    );
}
