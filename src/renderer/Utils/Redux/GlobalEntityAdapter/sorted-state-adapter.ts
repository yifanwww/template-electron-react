import { Comparer, EntityId, EntityState, IdSelector, Update } from '@reduxjs/toolkit';

import { GlobalEntityStateAdapter } from './types';
import { createUnsortedStateAdapter } from './unsorted-state-adapter';
import { selectIdValue } from './utils';

export function createSortedStateAdapter<T>(selectId: IdSelector<T>, sort: Comparer<T>): GlobalEntityStateAdapter<T> {
    const { removeOne, removeMany, removeAll } = createUnsortedStateAdapter(selectId);

    function areArraysEqual(a: unknown[], b: unknown[]) {
        if (a.length !== b.length) {
            return false;
        }

        for (let i = 0; i < a.length && i < b.length; i++) {
            if (a[i] === b[i]) continue;
            return false;
        }
        return true;
    }

    function merge(state: EntityState<T>, models: T[]): void {
        models.sort(sort);

        // Insert/overwrite all new/updated
        models.forEach((model) => {
            state.entities[selectId(model)] = model;
        });

        const allEntities = Object.values(state.entities) as T[];
        allEntities.sort(sort);

        const newSortedIds = allEntities.map(selectId);

        if (!areArraysEqual(state.ids, newSortedIds)) {
            state.ids = newSortedIds;
        }
    }

    function addMany<S extends EntityState<T>>(state: S, entities: T[] | Record<EntityId, T>): S {
        if (!Array.isArray(entities)) {
            entities = Object.values(entities);
        }

        const entitiesToAdd = entities.filter((entity) => !(selectIdValue(entity, selectId) in state.entities));

        if (entitiesToAdd.length !== 0) {
            merge(state, entitiesToAdd);
        }

        return state;
    }

    function addOne<S extends EntityState<T>>(state: S, entity: T): S {
        return addMany(state, [entity]);
    }

    function setAll<S extends EntityState<T>>(state: S, entities: T[] | Record<EntityId, T>): S {
        if (!Array.isArray(entities)) {
            entities = Object.values(entities);
        }

        state.entities = {};
        state.ids = [];

        addMany(state, entities);

        return state;
    }

    function takeUpdatedModel<S extends EntityState<T>>(models: T[], update: Update<T>, state: S): boolean {
        if (!(update.id in state.entities)) {
            return false;
        }

        const original = state.entities[update.id];
        const updated = <T>{ ...original, ...update.changes };
        const newKey = selectIdValue(updated, selectId);

        delete state.entities[update.id];

        models.push(updated);

        return newKey !== update.id;
    }

    function updateMany<S extends EntityState<T>>(state: S, updates: Update<T>[]): S {
        const models: T[] = [];

        updates.forEach((update) => takeUpdatedModel(models, update, state));

        if (models.length !== 0) {
            merge(state, models);
        }

        return state;
    }

    function updateOne<S extends EntityState<T>>(state: S, update: Update<T>): S {
        return updateMany(state, [update]);
    }

    function upsertMany<S extends EntityState<T>>(state: S, entities: T[] | Record<EntityId, T>): S {
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
