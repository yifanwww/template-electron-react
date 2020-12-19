export type NullableKeys<T> = { [K in keyof T]-?: undefined extends T[K] ? K : never }[keyof T];
export type NonNullableKeys<T> = { [K in keyof T]-?: undefined extends T[K] ? never : K }[keyof T];

export type ExtractFunction<T, K extends keyof T> = Extract<Readonly<T>[K], Function>;

export type FunctionKey<T, K extends keyof T> = ExtractFunction<T, K> extends never ? never : K;
export type FunctionKeys<T> = { [K in keyof T]-?: FunctionKey<T, K> }[keyof T];

export type NonFunctionKey<T, K extends keyof T> = ExtractFunction<T, K> extends never ? K : never;
export type NonFunctionKeys<T> = { [K in keyof T]-?: NonFunctionKey<T, K> }[keyof T];

export type PickFunctions<T> = Pick<T, FunctionKeys<T>>;
export type PickNonFunctions<T> = Pick<T, NonFunctionKeys<T>>;

export type RequiredWithOptionalFunction<T> = PickFunctions<T> & Required<PickNonFunctions<T>>;
