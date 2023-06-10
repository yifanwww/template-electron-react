import { useEffect, useRef } from 'react';

/**
 * Hook which asynchronously executes a callback once the component has been mounted.
 *
 * @param callback Function to call before mount.
 */
export function useMount(callback?: () => void): void {
    const ref = useRef(callback);

    // Update the ref each render so that the latest callback will be invoked if it changes.
    ref.current = callback;

    useEffect(() => {
        ref.current?.();
    }, []);
}
