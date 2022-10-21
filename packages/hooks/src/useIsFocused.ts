import { useEffect } from 'react';
import type { RefObject } from 'react';

import { useBoolean } from './useBoolean';

export function useIsFocused<T extends RefObject<HTMLElement>>(ref: T, enabled: boolean = true): boolean {
    const [isFocused, { setFalse: focusOut, setTrue: focusIn }] = useBoolean(false);

    useEffect(() => {
        if (enabled && ref.current) {
            ref.current.addEventListener('focusin', focusIn);
            ref.current.addEventListener('focusout', focusOut);
        }

        // fixes react-hooks/exhaustive-deps warning about stale ref elements
        const { current } = ref;

        return () => {
            if (enabled && current) {
                current.removeEventListener('focusin', focusIn);
                current.removeEventListener('focusout', focusOut);
            }
        };
    }, [enabled, focusIn, focusOut, ref]);

    return isFocused;
}
