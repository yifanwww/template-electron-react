import { useEffect } from 'react';

/**
 * Hook which asynchronously executes a callback once the component has been mounted.
 *
 * @param callback Function to call before mount.
 */
export function useMount(callback: () => void) {
    useEffect(
        () => {
            callback();
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [],
    );
}
