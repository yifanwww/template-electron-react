import { EntitySelectors, EntityState } from '@reduxjs/toolkit';

export function createSelectorsFactory<T>() {
    function getSelectors(): EntitySelectors<T, EntityState<T>>;
    function getSelectors<V>(selectState: (state: V) => EntityState<T>): EntitySelectors<T, V>;

    function getSelectors(selectState?: (state: any) => EntityState<T>): EntitySelectors<T, any> {
        if (!selectState) {
            const selectors: EntitySelectors<T, EntityState<T>> = {
                selectIds: (state) => state.ids,
                selectEntities: (state) => state.entities,
                selectAll: (state) => {
                    const { entities, ids } = state;
                    return ids.map((id) => <T>entities[id]);
                },
                selectTotal: (state) => state.ids.length,
                selectById: (state, id) => state.entities[id],
            };
            return selectors;
        } else {
            return {
                selectIds: (state) => selectState(state).ids,
                selectEntities: (state) => selectState(state).entities,
                selectAll: (state) => {
                    const { entities, ids } = selectState(state);
                    return ids.map((id) => <T>entities[id]);
                },
                selectTotal: (state) => selectState(state).ids.length,
                selectById: (state, id) => selectState(state).entities[id],
            };
        }
    }

    return { getSelectors };
}
