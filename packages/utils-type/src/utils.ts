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
export type Contain<T, U> = keyof U extends keyof T ? T : never;

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
export type Contained<T, U> = keyof T extends keyof U ? T : never;

export type ExcludeFunction<T> = Exclude<T, Function>;
export type ExtractFunction<T> = Extract<T, Function>;

/**
 * Exclude from T those types that start with underscore.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type ExcludeUnderscorePrefix<T> = T extends `_${infer R}` ? never : T;

/**
 * Construct a type with the properties of T except for those that start with underscore.
 */
export type OmitUnderscorePrefix<T extends object> = Pick<T, ExcludeUnderscorePrefix<keyof T>>;

/**
 * Pick the keys of the properties which are nullable.
 *
 * Example:
 *
 * ```ts
 * interface T { a: number; b: string | null; c: null | boolean }
 * type R = PickNullableKeys<T> // <-- "b" | "c"
 * ```
 */
export type PickNullableKeys<T> = {
    [K in keyof T]-?: null extends T[K] ? K : never;
}[keyof T];

/**
 * Pick the keys of the properties which are undefinable.
 *
 * Example:
 *
 * ```ts
 * interface T { a: number; b: string | undefined; c?: boolean }
 * type R = PickUndefinableKeys<T> // <-- "b" | "c"
 * ```
 */
export type PickUndefinableKeys<T> = {
    [K in keyof T]-?: undefined extends T[K] ? K : never;
}[keyof T];

/**
 * Pick the keys of the properties which are non-nullable.
 *
 * Example:
 *
 * ```ts
 * interface T { a: number; b: string | null; c?: number; e: number | undefined; f: string }
 * type R = PickNonNullableKeys<T> // <-- "a" | "f"
 * ```
 */
export type PickNonNullableKeys<T> = {
    [K in keyof T]-?: null extends T[K] ? never : undefined extends T[K] ? never : K;
}[keyof T];

/**
 * From T, pick a set of properties that are nullable.
 */
export type PickNullableProps<T> = Pick<T, PickNullableKeys<T>>;

/**
 * Construct a type with the properties of T except for those are nullable.
 */
export type OmitNullableProps<T> = Omit<T, PickNullableKeys<T>>;

/**
 * From T, pick a set of properties that are undefinable.
 */
export type PickUndefinableProps<T> = Pick<T, PickUndefinableKeys<T>>;

/**
 * Construct a type with the properties of T except for those are undefinable.
 */
export type OmitUndefinableProps<T> = Omit<T, PickUndefinableKeys<T>>;

/**
 * From T, pick a set of properties that are non-nullable.
 */
export type PickNonNullableProps<T> = Pick<T, PickNonNullableKeys<T>>;

/**
 * Construct a type with the properties of T except for those are non-nullable.
 */
export type OmitNonNullableProps<T> = Omit<T, PickNonNullableKeys<T>>;
