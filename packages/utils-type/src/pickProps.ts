import {
    PickNonNullableKeys,
    PickNonNullishKeys,
    PickNonUndefinableKeys,
    PickNullableKeys,
    PickNullishKeys,
    PickUndefinableKeys,
} from './pickKeys';

/**
 * From T, pick a set of properties that are nullable.
 */
export type PickNullableProps<T> = Pick<T, PickNullableKeys<T>>;

/**
 * Construct a type with the properties of T except for those are nullable.
 */
export type OmitNullableProps<T> = Omit<T, PickNullableKeys<T>>;

/**
 * From T, pick a set of properties that are non-nullable.
 */
export type PickNonNullableProps<T> = Pick<T, PickNonNullableKeys<T>>;

/**
 * Construct a type with the properties of T except for those are non-nullable.
 */
export type OmitNonNullableProps<T> = Omit<T, PickNonNullableKeys<T>>;

/**
 * From T, pick a set of properties that are undefinable.
 */
export type PickUndefinableProps<T> = Pick<T, PickUndefinableKeys<T>>;

/**
 * Construct a type with the properties of T except for those are undefinable.
 */
export type OmitUndefinableProps<T> = Omit<T, PickUndefinableKeys<T>>;

/**
 * From T, pick a set of properties that are non-undefinable.
 */
export type PickNonUndefinableProps<T> = Pick<T, PickNonUndefinableKeys<T>>;

/**
 * Construct a type with the properties of T except for those are non-undefinable.
 */
export type OmitNonUndefinableProps<T> = Omit<T, PickNonUndefinableKeys<T>>;

/**
 * From T, pick a set of properties that are nullish.
 */
export type PickNullishProps<T> = Pick<T, PickNullishKeys<T>>;

/**
 * Construct a type with the properties of T except for those are nullish.
 */
export type OmitNullishProps<T> = Omit<T, PickNullishKeys<T>>;

/**
 * From T, pick a set of properties that are non-nullish.
 */
export type PickNonNullishProps<T> = Pick<T, PickNonNullishKeys<T>>;

/**
 * Construct a type with the properties of T except for those are non-nullish.
 */
export type OmitNonNullishProps<T> = Omit<T, PickNonNullishKeys<T>>;
