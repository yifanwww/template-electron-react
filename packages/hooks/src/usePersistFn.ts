import { useRef } from 'react';

import { useConstFn } from './useConstFn';

export function usePersistFn<T extends (...args: never[]) => unknown>(fn: T): T {
    const ref = useRef<T>(fn);
    ref.current = fn;

    const persistFn = useConstFn((...args: never[]) => ref.current(...args));

    return persistFn as never;
}
