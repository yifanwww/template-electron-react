import { RefObject, useEffect } from 'react';

interface IFocusableElement {
    focus(): void;
}

export function useImmediateFocus<T extends IFocusableElement>(element: RefObject<T>, focus: boolean = true): void {
    useEffect(() => {
        if (focus) {
            element.current?.focus();
        }
    }, [element, focus]);
}
