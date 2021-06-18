import { RefObject, useEffect } from 'react';

import { useBoolean } from './useBoolean';

export function useHover(ref: RefObject<HTMLElement>, enabled: boolean = true): boolean {
    if (process.env.NODE_ENV === 'development') {
        if (typeof ref !== 'object' || ref.current === undefined) {
            console.error('useHover expects a ref of a html element.');
        }
    }

    const [isHovered, { setFalse: onMouseOut, setTrue: onMouseOver }] = useBoolean(false);

    useEffect(() => {
        if (enabled && ref && ref.current) {
            ref.current.addEventListener('mouseover', onMouseOver);
            ref.current.addEventListener('mouseout', onMouseOut);
        }

        // fixes react-hooks/exhaustive-deps warning about stale ref elements
        const { current } = ref;

        return () => {
            if (enabled && current) {
                current.removeEventListener('mouseover', onMouseOver);
                current.removeEventListener('mouseout', onMouseOut);
            }
        };
    }, [enabled, onMouseOut, onMouseOver, ref]);

    return isHovered;
}
