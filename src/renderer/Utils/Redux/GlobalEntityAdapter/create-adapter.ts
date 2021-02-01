import { Comparer, EntityId } from '@reduxjs/toolkit';

import { createInitialStateFactory } from './entity-state';
import { createSortedStateAdapter } from './sorted-state-adapter';
import { createSelectorsFactory } from './state-selectors';
import { GlobalEntityAdapter } from './types';
import { createUnsortedStateAdapter } from './unsorted-state-adapter';

interface EntityDefinition<T> {
    selectId: (model: T) => EntityId;
    sortComparer: false | Comparer<T>;
}

/**
 * Used only for the global state.
 * Reference: https://github.com/reduxjs/redux-toolkit/blob/v1.5.0/src/entities/create_adapter.ts
 */
export function createGlobalEntityAdapter<T>(
    options: Partial<EntityDefinition<T>>,
): GlobalEntityAdapter<T> {
    const { selectId, sortComparer }: EntityDefinition<T> = {
        selectId: (instance: any) => instance.id,
        sortComparer: false,
        ...options,
    };

    const { getInitialState } = createInitialStateFactory<T>();
    const { getSelectors } = createSelectorsFactory<T>();
    const stateAdapter = sortComparer
        ? createSortedStateAdapter(selectId, sortComparer)
        : createUnsortedStateAdapter(selectId);

    return {
        selectId,
        sortComparer,
        getInitialState,
        getSelectors,
        ...stateAdapter,
    };
}
