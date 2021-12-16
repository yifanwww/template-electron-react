import TS from 'ts-essentials';

declare global {
    /* ----- Types ----- */

    type Primitive = TS.Primitive;
    type Builtin = TS.Builtin;

    type Integer = number;

    type AnyFn = (...args: unknown[]) => unknown;
    type UnknownFn = (...args: never[]) => unknown;

    /* ----- Type Utils ----- */

    type Optional<T> = T | null;

    type ValueOf<T> = T[keyof T];

    /**
     * Pick the non-nullable type of a certain property of interface `P`.
     *
     * Example:
     *
     * ```ts
     * interface Props { a: boolean; b?: string }
     * ```
     * The result of `PickProp<Props, 'a'>` is `boolean`,
     * the result of `PickProp<Props, 'b'>` is not `string | undefined` but `string`.
     */
    type PickProp<P, K extends keyof P> = NonNullable<P[K]>;

    type VoidReturn<T extends UnknownFn> = (...args: Parameters<T>) => void;

    /**
     * Obtain the static methods of a class.
     */
    type ClassStaticMethods<T extends abstract new (...args: unknown[]) => unknown> = Exclude<keyof T, 'prototype'>;

    /**
     * TypeScript type to return a deep partial object (each property can be undefined, recursively).
     */
    type DeepPartial<T> = TS.DeepPartial<T>;

    /**
     * TypeScript type to return a deep required object (recursively).
     */
    type DeepRequired<T> = TS.DeepRequired<T>;

    /**
     * TypeScript type to return a deep readonly object (recursively).
     */
    type DeepReadonly<T> = TS.DeepReadonly<T>;

    /**
     * TypeScript type to return a writable object (each property is not readonly).
     */
    type Writable<T> = TS.Writable<T>;

    /**
     * TypeScript type to return a deep writable object (each property is not readonly, recursively).
     */
    type DeepWritable<T> = TS.DeepWritable<T>;

    type Merge<M, N> = TS.Merge<M, N>;
}
