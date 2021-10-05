import { useRef, useEffect } from 'react';

export function usePrevious<T>(value: T): T | undefined;
export function usePrevious<T>(value: T, initialValue: null): T | null;
export function usePrevious<T>(value: T, initialValue: T): T;

/**
 * Hook keeping track of a given value from a previous execution of the component the Hook is used in.
 *
 * See [React Hooks FAQ](https://reactjs.org/docs/hooks-faq.html#how-to-get-the-previous-props-or-state)
 */
export function usePrevious<T>(value: T, initialValue: T | null | undefined = undefined): T | null | undefined {
    const ref = useRef(initialValue);
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}
