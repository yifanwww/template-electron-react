import { useState, useMemo } from 'react';

type IToggleState = string | number | boolean | undefined;

/** Updater actions returned by `useToggle`. */
export interface IUseToggleActions<T = IToggleState> {
    /** Set the value to the initial value. */
    readonly setLeft: () => void;
    /** Set the value to the reverse value. */
    readonly setRight: () => void;
    /** Toggle the value. */
    readonly toggle: (value?: T) => void;
}

export function useToggle<T = boolean | undefined>(): [boolean, IUseToggleActions<T>];
export function useToggle<T = IToggleState>(defaultValue: T): [T, IUseToggleActions<T>];
export function useToggle<T = IToggleState, U = IToggleState>(
    defaultValue: T,
    reverseValue: U,
): [T | U, IUseToggleActions<T | U>];

export function useToggle<I extends IToggleState = IToggleState, R extends IToggleState = IToggleState>(
    initialValue: I = false as I,
    reverseValue?: R,
): [I | R, IUseToggleActions<I | R>] {
    const [value, setValue] = useState<I | R>(initialValue);

    const actions = useMemo<IUseToggleActions<I | R>>(() => {
        const defaultReverseValue = (reverseValue === undefined ? !initialValue : reverseValue) as I | R;

        return {
            setLeft: () => setValue(initialValue),
            setRight: () => setValue(defaultReverseValue),
            toggle: (_value) => {
                if (_value !== undefined) {
                    setValue(_value);
                } else {
                    setValue((prev) => (prev === initialValue ? defaultReverseValue : initialValue));
                }
            },
        };
    }, [initialValue, reverseValue]);

    return [value, actions];
}
