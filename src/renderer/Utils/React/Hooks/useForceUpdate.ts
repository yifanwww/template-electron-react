import { useState } from 'react';

import { useConstFunction } from './useConstFunction';

/**
 * Hook to force update a function component by updating a dummy state.
 */
export function useForceUpdate(): () => void {
    const [, setValue] = useState(0);
    const forceUpdate = useConstFunction(() => setValue((value) => ++value));
    return forceUpdate;
}
