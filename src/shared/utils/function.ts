import type { UnknownFn } from '../types/index.js';

export function makeFn<T extends UnknownFn>(fn: T): T {
    return fn;
}
