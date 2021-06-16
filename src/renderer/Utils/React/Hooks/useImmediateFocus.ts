import { RefObject, useEffect } from 'react';

interface FocusableElement {
    focus(): void;
}

export function useImmediateFocus(element: RefObject<FocusableElement>, focus: boolean = true): void {
    useEffect(() => {
        if (focus) {
            element.current?.focus();
        }
    }, [element, focus]);
}
