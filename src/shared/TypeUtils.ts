export type NullableKeys<T> = { [K in keyof T]-?: undefined extends T[K] ? K : never }[keyof T];
export type NonNullableKeys<T> = { [K in keyof T]-?: undefined extends T[K] ? never : K }[keyof T];

export type ExtractFunction<T, K extends keyof T> = Extract<Readonly<T>[K], Function>;

export type FunctionKey<T, K extends keyof T> = ExtractFunction<T, K> extends never ? never : K;
export type FunctionKeys<T> = { [K in keyof T]-?: FunctionKey<T, K> }[keyof T];

export type NonFunctionKey<T, K extends keyof T> = ExtractFunction<T, K> extends never ? K : never;
export type NonFunctionKeys<T> = { [K in keyof T]-?: NonFunctionKey<T, K> }[keyof T];

export type PickFunctions<T> = Pick<T, FunctionKeys<T>>;
export type PickNonFunctions<T> = Pick<T, NonFunctionKeys<T>>;

export type RequiredNonFunction<T> = PickFunctions<T> & Required<PickNonFunctions<T>>;

/**
 * TypeScript type to return a deep partial object (each property can be undefined, recursively).
 */
// prettier-ignore
export type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends (infer U)[]
        ? DeepPartial<U>[]
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
        : T[P] extends object
            ? DeepReadonly<T[P]>
            : T[P];
};
