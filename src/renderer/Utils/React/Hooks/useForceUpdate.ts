import { useState } from 'react';

import { useConstFn } from './useConstFn';

/**
 * Hook to force update a function component by updating a dummy state.
 */
export function useForceUpdate(): () => void {
    const [, setValue] = useState(0);
    const forceUpdate = useConstFn(() => setValue((value) => (value + 1) % 1_000_000_000));
    return forceUpdate;
}
