/**
 * Pick the keys of the properties which are nullable.
 *
 * Example:
 *
 * ```ts
 * interface T { a: number; b: string | null; c: boolean | undefined; d?: string }
 * type R = PickNullableKeys<T> // <-- "b"
 * ```
 */
export type PickNullableKeys<T> = {
    [K in keyof T]-?: null extends T[K] ? K : never;
}[keyof T];

/**
 * Pick the keys of the properties which are non-nullable.
 *
 * Example:
 *
 * ```ts
 * interface T { a: number; b: string | null; c: boolean | undefined; d?: string }
 * type R = PickNonNullableKeys<T> // <-- "a" | "c" | "d"
 * ```
 */
export type PickNonNullableKeys<T> = {
    [K in keyof T]-?: null extends T[K] ? never : K;
}[keyof T];

/**
 * Pick the keys of the properties which are undefinable.
 *
 * Example:
 *
 * ```ts
 * interface T { a: number; b: string | null; c: boolean | undefined; d?: string }
 * type R = PickUndefinableKeys<T> // <-- "b" | "c"
 * ```
 */
export type PickUndefinableKeys<T> = {
    [K in keyof T]-?: undefined extends T[K] ? K : never;
}[keyof T];

/**
 * Pick the keys of the properties which are non-undefinable.
 *
 * Example:
 *
 * ```ts
 * interface T { a: number; b: string | null; c: boolean | undefined; d?: string }
 * type R = PickNonUndefinableKeys<T> // <-- "a" | "b"
 * ```
 */
export type PickNonUndefinableKeys<T> = {
    [K in keyof T]-?: undefined extends T[K] ? never : K;
}[keyof T];

/**
 * Pick the keys of the properties which are nullish.
 *
 * Example:
 *
 * ```ts
 * interface T { a: number; b: string | null; c: boolean | undefined; d?: string }
 * type R = PickNullishKeys<T> // <-- "b" | "c" | "d"
 * ```
 */
export type PickNullishKeys<T> = {
    [K in keyof T]-?: undefined extends T[K] ? K : null extends T[K] ? K : never;
}[keyof T];

/**
 * Pick the keys of the properties which are non-nullish.
 *
 * Example:
 *
 * ```ts
 * interface T { a: number; b: string | null; c: boolean | undefined; d?: string }
 * type R = PickNonNullishKeys<T> // <-- "a"
 * ```
 */
export type PickNonNullishKeys<T> = {
    [K in keyof T]-?: undefined extends T[K] ? never : null extends T[K] ? never : K;
}[keyof T];
