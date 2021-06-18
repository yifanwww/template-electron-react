import { useState } from 'react';

import { useConst } from './useConst';

/** Updater actions returned by `useBoolean`. */
export interface IUseBooleanActions {
    /** Set the value to true. Always has the same identity. */
    readonly setTrue: () => void;
    /** Set the value to false. Always has the same identity. */
    readonly setFalse: () => void;
    /** Toggle the value. Always has the same identity. */
    readonly toggle: () => void;
}

/**
 * Hook to store a value and generate actions for setting the value to true or false.
 * The identity of the actions will always stay the same.
 *
 * @param initialValue Initial value
 * @returns Array with the current value and an object containing the updater actions.
 */
export function useBoolean(initialValue: boolean): [boolean, IUseBooleanActions] {
    const [value, setValue] = useState(initialValue);

    const actions = useConst(() => ({
        setFalse: () => setValue(false),
        setTrue: () => setValue(true),
        toggle: () => setValue((prev) => !prev),
    }));

    return [value, actions];
}
