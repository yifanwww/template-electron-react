import {
    Comparer,
    EntityId,
    EntitySelectors,
    EntityState,
    IdSelector,
    Update,
} from '@reduxjs/toolkit';

declare type IsAny<T, True, False = never> = true | false extends (T extends never ? true : false)
    ? True
    : False;
declare type PreventAny<S, T> = IsAny<S, EntityState<T>, S>;

// prettier-ignore
/* eslint-disable max-len */
export interface GlobalEntityStateAdapter<T> {
    addOne<S extends EntityState<T>>(state: PreventAny<S, T>, entity: T): S;
    addMany<S extends EntityState<T>>(state: PreventAny<S, T>, entities: T[] | Record<EntityId, T>): S;
    setAll<S extends EntityState<T>>(state: PreventAny<S, T>, entities: T[] | Record<EntityId, T>): S;
    removeOne<S extends EntityState<T>>(state: PreventAny<S, T>, key: EntityId): S;
    removeMany<S extends EntityState<T>>(state: PreventAny<S, T>, keys: EntityId[]): S;
    removeAll<S extends EntityState<T>>(state: PreventAny<S, T>): S;
    updateOne<S extends EntityState<T>>(state: PreventAny<S, T>, update: Update<T>): S;
    updateMany<S extends EntityState<T>>(state: PreventAny<S, T>, updates: Update<T>[]): S;
    upsertOne<S extends EntityState<T>>(state: PreventAny<S, T>, entity: T): S;
    upsertMany<S extends EntityState<T>>(state: PreventAny<S, T>, entities: T[] | Record<EntityId, T>): S;
}
/* eslint-enable max-len */

export interface GlobalEntityAdapter<T> extends GlobalEntityStateAdapter<T> {
    selectId: IdSelector<T>;
    sortComparer: false | Comparer<T>;
    getInitialState(): EntityState<T>;
    getInitialState<S extends object>(state: S): EntityState<T> & S;
    getSelectors(): EntitySelectors<T, EntityState<T>>;
    getSelectors<V>(selectState: (state: V) => EntityState<T>): EntitySelectors<T, V>;
}
