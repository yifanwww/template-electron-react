/**
 * TypeScript type to return a deep partial object (each property can be undefined, recursively).
 */
// prettier-ignore
export type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends (infer U)[]
        ? DeepPartial<U>[]
        : T[P] extends (...args: any[]) => any
            ? T[P]
            : T[P] extends object
                ? DeepPartial<T[P]>
                : T[P];
};

/**
 * TypeScript type to return a deep readonly object (recursively).
 */
// prettier-ignore
export type DeepReadonly<T> = {
    readonly [P in keyof T]: T[P] extends (infer U)[]
        ? DeepReadonly<U>[]
        : T[P] extends (...args: any[]) => any
            ? T[P]
            : T[P] extends object
                ? DeepReadonly<T[P]>
                : T[P];
};

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
