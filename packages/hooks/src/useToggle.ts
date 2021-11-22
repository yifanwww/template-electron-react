import { useState, useCallback } from 'react';

type ToggleState = string | number | boolean | undefined;

/** Updater actions returned by `useToggle`. */
export interface UseToggleActions<T = ToggleState> {
    /** Set the value to the initial value. */
    readonly setLeft: () => void;
    /** Set the value to the reverse value. */
    readonly setRight: () => void;
    /** Toggle the value. */
    readonly toggle: (value?: T) => void;
}

export function useToggle<T = boolean | undefined>(): [boolean, UseToggleActions<T>];
export function useToggle<T = ToggleState>(defaultValue: T): [T, UseToggleActions<T>];
export function useToggle<T = ToggleState, U = ToggleState>(
    defaultValue: T,
    reverseValue: U,
): [T | U, UseToggleActions<T | U>];

export function useToggle<I extends ToggleState = ToggleState, R extends ToggleState = ToggleState>(
    initialValue: I = false as I,
    reverseValue?: R,
): [I | R, UseToggleActions<I | R>] {
    const [value, setValue] = useState<I | R>(initialValue);

    const defaultReverseValue = (reverseValue === undefined ? !initialValue : reverseValue) as I | R;

    const setLeft = useCallback(() => setValue(initialValue), [initialValue]);
    const setRight = useCallback(() => setValue(defaultReverseValue), [defaultReverseValue]);

    const toggle = useCallback(
        (_value) => {
            if (_value !== undefined) {
                setValue(_value);
            } else {
                setValue((prev) => (prev === initialValue ? defaultReverseValue : initialValue));
            }
        },
        [defaultReverseValue, initialValue],
    );

    return [value, { setLeft, setRight, toggle }];
}
