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
 * The `createGlobalEntityAdapter` function is implemented with reference to `createEntityAdapter`
 * (https://github.com/reduxjs/redux-toolkit/blob/v1.5.0/src/entities/create_adapter.ts) only for
 * the global state.
 *
 * An adapter created from `createEntityAdapter` operates entities by generated reducer functions.
 * Reducer functions do not work in the global state, you should use `createGlobalEntityAdapter`
 * instead to create your adapter to operate the entities.
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
