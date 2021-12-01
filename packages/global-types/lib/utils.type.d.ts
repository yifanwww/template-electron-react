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

    /**
     * T must contains all the properties of U.
     *
     * The result of 'a' extends 'a' | 'b' is true, but the result of 'a' | 'b' extends 'a' is false.
     *
     * Example:
     *
     * ```ts
     * interface A { a: string; b: string }
     * interface B { a: string }
     * ```
     * The result of `Contain<A, B>` is `A`, while the result of `Contain<B, A>` is `never`.
     */
    type Contain<T, U> = keyof U extends keyof T ? T : never;

    /**
     * The properties of T must be contained in U.
     *
     * The result of 'a' extends 'a' | 'b' is true, but the result of 'a' | 'b' extends 'a' is false.
     *
     * Example:
     *
     * ```ts
     * interface A { a: string; b: string }
     * interface B { a: string }
     * ```
     * The result of `Contained<B, A>` is `B`, while the result of `Contained<A, B>` is `never`.
     */
    type Contained<T, U> = keyof T extends keyof U ? T : never;

    /**
     * Exclude from T those types that start with underscore.
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    type ExcludeUnderscorePrefix<T> = T extends `_${infer R}` ? never : T;

    /**
     * Construct a type with the properties of T except for those that start with underscore.
     */
    type OmitUnderscorePrefix<T extends object> = Pick<T, ExcludeUnderscorePrefix<keyof T>>;

    type ExcludeFunction<T> = Exclude<T, Function>;
    type ExtractFunction<T> = Extract<T, Function>;

    /**
     * Obtain the static methods of a class.
     */
    type ClassStaticMethods<T extends abstract new (...args: unknown[]) => unknown> = Exclude<keyof T, 'prototype'>;

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
}
