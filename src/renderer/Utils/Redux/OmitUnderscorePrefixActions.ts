import { IActions } from './IDispatching';

export function omitUnderscorePrefixActions<T extends IActions>(internalActions: T): OmitUnderscorePrefix<T> {
    const actions: Record<string, Function> = {};

    for (const key in internalActions) {
        if (!key.startsWith('_')) actions[key] = internalActions[key];
    }

    return actions as OmitUnderscorePrefix<T>;
}
