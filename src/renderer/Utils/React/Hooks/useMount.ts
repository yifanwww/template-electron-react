import { useEffect, useRef } from 'react';

/**
 * Hook which asynchronously executes a callback once the component has been mounted.
 *
 * @param callback Function to call before mount.
 */
export function useMount(callback: () => void) {
    const mountRef = useRef(callback);
    mountRef.current = callback;
    useEffect(() => {
        mountRef.current?.();
    }, []);
}
