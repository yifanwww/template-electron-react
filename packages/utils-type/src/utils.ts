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
export type ExcludeUnderscorePrefix<T> = T extends `_${string}` ? never : T;

/**
 * Construct a type with the properties of T except for those that start with underscore.
 */
export type OmitUnderscorePrefix<T extends object> = Pick<T, ExcludeUnderscorePrefix<keyof T>>;

// https://stackoverflow.com/questions/69763621/check-if-object-is-empty-using-typescript-generic
export type IsEmptyObject<T> = [keyof T] extends [never] ? true : false;
