import { useEffect, useRef } from 'react';

export function useWhyDidYouUpdate<P extends Record<string, unknown>>(name: string, props: P): void {
    const prevPropsRef = useRef<P>();

    useEffect(() => {
        const prevProps = prevPropsRef.current;

        if (prevProps === undefined) {
            console.log(`[why-did-you-update] '${name}' first render.`);
        } else {
            const keys = Object.keys({ ...prevProps, ...props });
            const changes: Record<string, { from: unknown; to: unknown }> = {};

            for (const key of keys) {
                if (prevProps[key] !== props[key]) {
                    changes[key] = { from: prevProps[key], to: props[key] };
                }
            }

            if (Object.keys(changes).length) {
                console.log(`[why-did-you-update] '${name}'`, changes);
            }
        }

        prevPropsRef.current = props;
    });
}
