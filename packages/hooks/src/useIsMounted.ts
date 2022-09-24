import { useEffect, useRef } from 'react';

import { usePersistFn } from './usePersistFn';

/**
 * Hook to check whether this component is mounted.
 *
 * If you use this hook to decide whether you can call `React.setState`,
 * then you don't need to use this hook since React 18: https://github.com/reactwg/react-18/discussions/82
 *
 * @returns The function to get whether this component is mounted. The identity of this function will never change.
 */
export function useIsMounted(): () => boolean {
    const mountedRef = useRef(false);

    useEffect(() => {
        mountedRef.current = true;
        return () => {
            mountedRef.current = false;
        };
    }, []);

    return usePersistFn(() => mountedRef.current);
}
