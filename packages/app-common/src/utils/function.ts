import type { UnknownFn } from '../types';

export function makeFn<T extends UnknownFn>(fn: T): T {
    return fn;
}
