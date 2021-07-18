/**
 * TypeScript type to return a deep partial object (each property can be undefined, recursively).
 */
// prettier-ignore
export type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends (infer U)[]
        ? DeepPartial<U>[]
        : T[P] extends (...args: never[]) => unknown
            ? T[P]
            : T[P] extends object
                ? DeepPartial<T[P]>
                : T[P];
};

export type Primitive = string | number | boolean | bigint | symbol | undefined | null;
export type Builtin = Primitive | Function | Date | Error | RegExp;

/**
 * TypeScript type to return a deep readonly object (recursively).
 */
// prettier-ignore
export type DeepReadonly<T> = T extends Builtin
    ? T
    : T extends Map<infer K, infer V>
        ? ReadonlyMap<DeepReadonly<K>, DeepReadonly<V>>
        : T extends ReadonlyMap<infer K, infer V>
            ? ReadonlyMap<DeepReadonly<K>, DeepReadonly<V>>
            : T extends WeakMap<infer K, infer V>
                ? WeakMap<DeepReadonly<K>, DeepReadonly<V>>
                : T extends Set<infer U>
                    ? ReadonlySet<DeepReadonly<U>>
                    : T extends ReadonlySet<infer U>
                        ? ReadonlySet<DeepReadonly<U>>
                        : T extends WeakSet<infer U>
                            ? WeakSet<DeepReadonly<U>>
                            : T extends Promise<infer U>
                                ? Promise<DeepReadonly<U>>
                                : T extends (infer U)[]
                                    ? DeepReadonly<U>[]
                                    : T extends {}
                                        ? { readonly [K in keyof T]: DeepReadonly<T[K]> }
                                        : Readonly<T>

/**
 * T must contains all the properties of U.
 *
 * The result of 'a' extends 'a' | 'b' is true, but the result of 'a' | 'b' extends 'a' is false.
 */
export type Contain<T, U> = keyof U extends keyof T ? T : never;

/**
 * The properties of T must be contained in U.
 *
 * The result of 'a' extends 'a' | 'b' is true, but the result of 'a' | 'b' extends 'a' is false.
 */
export type Contained<T, U> = keyof T extends keyof U ? T : never;

/**
 * Generic type for Object.
 */
export type Object<T extends string | number = string | number, U = unknown> = { [key in T]: U };

/**
 * Generic type for Object, with value being string.
 */
export type ObjectStr<T extends string | number = string | number> = Object<T, string>;

/**
 * Generic type for Object, with value being number.
 */
export type ObjectNum<T extends string | number = string | number> = Object<T, number>;

/**
 * Exclude from T those types that start with underscore.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type ExcludeUnderscorePrefix<T> = T extends `_${infer R}` ? never : T;

/**
 * Construct a type with the properties of T except for those that start with underscore.
 */
export type OmitUnderscorePrefix<T extends object> = Pick<T, ExcludeUnderscorePrefix<keyof T>>;

export type Optional<T> = T | null;

export type ExcludeFunction<T> = Exclude<T, Function>;
export type ExtractFunction<T> = Extract<T, Function>;
