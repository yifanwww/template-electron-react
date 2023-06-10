/* ----- Types ----- */

type Integer = number;

type AnyFn = (...args: unknown[]) => unknown;

/**
 * Used for generic function to infer function parameters.
 *
 * Example:
 *
 * ```ts
 * function fn<T extends UnknownFn>(cb: T): void {}
 * ```
 */
type UnknownFn = (...args: never[]) => unknown;

/* ----- Type Utils ----- */

type Optional<T> = T | null;

type ValueOf<T> = T[keyof T];

type LooseArray<T> = T | readonly T[];

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
