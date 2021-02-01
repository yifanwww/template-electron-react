import { EntityId, EntityState, IdSelector, Update } from '@reduxjs/toolkit';

import { GlobalEntityStateAdapter } from './types';
import { selectIdValue } from './utils';

export function createUnsortedStateAdapter<T>(
    selectId: IdSelector<T>,
): GlobalEntityStateAdapter<T> {
    function addOne<S extends EntityState<T>>(state: S, entity: T): S {
        const key = selectIdValue(entity, selectId);

        if (!(key in state.entities)) {
            state.ids.push(key);
            state.entities[key] = entity;
        }

        return state;
    }

    function addMany<S extends EntityState<T>>(state: S, entities: T[] | Record<EntityId, T>): S {
        if (!Array.isArray(entities)) {
            entities = Object.values(entities);
        }

        for (const entity of entities) {
            addOne(state, entity);
        }

        return state;
    }

    function setAll<S extends EntityState<T>>(state: S, entities: T[] | Record<EntityId, T>): S {
        if (!Array.isArray(entities)) {
            entities = Object.values(entities);
        }

        state.ids = [];
        state.entities = {};

        addMany(state, entities);

        return state;
    }

    function removeAll<S extends EntityState<T>>(state: S): S {
        state.ids = [];
        state.entities = {};
        return state;
    }

    function removeMany<S extends EntityState<T>>(state: S, keys: EntityId[]): S {
        let didMutate = false;

        for (const key of keys) {
            if (key in state.entities) {
                delete state.entities[key];
                didMutate = true;
            }
        }

        if (didMutate) {
            state.ids = state.ids.filter((id) => id in state.entities);
        }

        return state;
    }

    function removeOne<S extends EntityState<T>>(state: S, key: EntityId): S {
        return removeMany(state, [key]);
    }

    function takeNewKey<S extends EntityState<T>>(
        keys: { [id: string]: EntityId },
        update: Update<T>,
        state: S,
    ): boolean {
        const original = state.entities[update.id];
        const updated = <T>{ ...original, ...update.changes };
        const newKey = selectIdValue(updated, selectId);
        const hasNewKey = newKey !== update.id;

        if (hasNewKey) {
            keys[update.id] = newKey;
            delete state.entities[update.id];
        }

        state.entities[newKey] = updated;

        return hasNewKey;
    }

    function updateMany<S extends EntityState<T>>(state: S, updates: Update<T>[]): S {
        const newKeys: { [id: string]: EntityId } = {};

        const updatesPerEntity: { [id: string]: Update<T> } = {};

        updates.forEach((update) => {
            // Only apply updates to entities that currently exist
            if (update.id in state.entities) {
                // If there are multiple updates to one entity, merge them together
                updatesPerEntity[update.id] = {
                    id: update.id,
                    // Spreads ignore falsy values, so this works even if there isn't
                    // an existing update already at this key
                    changes: {
                        ...(updatesPerEntity[update.id]
                            ? updatesPerEntity[update.id].changes
                            : null),
                        ...update.changes,
                    },
                };
            }
        });

        updates = Object.values(updatesPerEntity);

        const didMutateEntities = updates.length > 0;

        if (didMutateEntities) {
            const didMutateIds =
                updates.filter((update) => takeNewKey(newKeys, update, state)).length > 0;

            if (didMutateIds) {
                state.ids = state.ids.map((id) => newKeys[id] || id);
            }
        }

        return state;
    }

    function updateOne<S extends EntityState<T>>(state: S, update: Update<T>): S {
        return updateMany(state, [update]);
    }

    function upsertMany<S extends EntityState<T>>(
        state: S,
        entities: T[] | Record<EntityId, T>,
    ): S {
        if (!Array.isArray(entities)) {
            entities = Object.values(entities);
        }

        const added: T[] = [];
        const updated: Update<T>[] = [];

        for (const entity of entities) {
            const id = selectIdValue(entity, selectId);
            if (id in state.entities) {
                updated.push({ id, changes: entity });
            } else {
                added.push(entity);
            }
        }

        updateMany(state, updated);
        addMany(state, added);

        return state;
    }

    function upsertOne<S extends EntityState<T>>(state: S, entity: T): S {
        return upsertMany(state, [entity]);
    }

    return <any>{
        addOne,
        addMany,
        setAll,
        removeOne,
        removeMany,
        removeAll,
        updateOne,
        updateMany,
        upsertOne,
        upsertMany,
    };
}
