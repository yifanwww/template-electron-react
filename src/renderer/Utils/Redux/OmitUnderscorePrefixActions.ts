import { OmitUnderscorePrefix } from '#shared/TypeUtils';

import { IActions } from './IDispatching';

export function omitUnderscorePrefixActions<T extends IActions>(internalActions: T): OmitUnderscorePrefix<T> {
    const actions: Partial<OmitUnderscorePrefix<T>> = {};

    for (const key in internalActions) {
        if (!key.startsWith('_')) (actions as any)[key] = internalActions[key];
    }

    return actions as OmitUnderscorePrefix<T>;
}
