import { useState } from 'react';

import { useConstFunction } from './useConstFunction';

/** Updater callbacks returned by `useBoolean`. */
export interface IUseBooleanCallbacks {
    /** Set the value to true. Always has the same identity. */
    readonly setTrue: () => void;
    /** Set the value to false. Always has the same identity. */
    readonly setFalse: () => void;
    /** Toggle the value. Always has the same identity. */
    readonly toggle: () => void;
}

/**
 * Hook to store a value and generate callbacks for setting the value to true or false.
 * The identity of the callbacks will always stay the same.
 *
 * @param initialState Initial value
 * @returns Array with the current value and an object containing the updater callbacks.
 */
export function useBoolean(initialState: boolean): [boolean, IUseBooleanCallbacks] {
    const [value, setValue] = useState(initialState);

    const setTrue = useConstFunction(() => setValue(true));
    const setFalse = useConstFunction(() => setValue(false));
    const toggle = useConstFunction(() => setValue((curr) => !curr));

    return [value, { setTrue, setFalse, toggle }];
}
