import type { ReduxActions } from './types';

/**
 * Exclude from T those types that start with underscore.
 */
type ExcludeUnderscorePrefix<T> = T extends `_${string}` ? never : T;

/**
 * Construct a type with the properties of T except for those that start with underscore.
 */
type OmitUnderscorePrefix<T extends object> = Pick<T, ExcludeUnderscorePrefix<keyof T>>;

export function omitUnderscorePrefixActions<T extends ReduxActions>(internalActions: T): OmitUnderscorePrefix<T> {
    const actions: Record<string, Function> = {};

    for (const key in internalActions) {
        if (!key.startsWith('_')) actions[key] = internalActions[key];
    }

    return actions as OmitUnderscorePrefix<T>;
}
