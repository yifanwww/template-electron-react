import { useState, useCallback } from 'react';

type IToggleState = string | number | boolean | undefined;

/** Updater actions returned by `useToggle`. */
export interface IUseToggleUpdaters<T = IToggleState> {
    /** Set the value to the initial value. */
    readonly setLeft: () => void;
    /** Set the value to the reverse value. */
    readonly setRight: () => void;
    /** Toggle the value. */
    readonly toggle: (value?: T) => void;
}

export function useToggle<T = boolean | undefined>(): [boolean, IUseToggleUpdaters<T>];
export function useToggle<T = IToggleState>(defaultValue: T): [T, IUseToggleUpdaters<T>];
export function useToggle<T = IToggleState, U = IToggleState>(
    defaultValue: T,
    reverseValue: U,
): [T | U, IUseToggleUpdaters<T | U>];

export function useToggle<I extends IToggleState = IToggleState, R extends IToggleState = IToggleState>(
    initialValue: I = false as I,
    reverseValue?: R,
): [I | R, IUseToggleUpdaters<I | R>] {
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
