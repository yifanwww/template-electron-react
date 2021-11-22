import { RefObject, useEffect } from 'react';

interface FocusableElement {
    focus(): void;
}

export function useImmediateFocus<T extends FocusableElement>(element: RefObject<T>, focus: boolean = true): void {
    useEffect(() => {
        if (focus) {
            element.current?.focus();
        }
    }, [element, focus]);
}
