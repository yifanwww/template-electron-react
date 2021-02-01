import { EntityState } from '@reduxjs/toolkit';

export function createInitialStateFactory<V>() {
    function getInitialState(): EntityState<V>;
    function getInitialState<S extends object>(additionalState: S): EntityState<V> & S;

    function getInitialState(additionalState: any = {}): any {
        return {
            ...{ ids: [], entities: {} },
            ...additionalState,
        };
    }

    return { getInitialState };
}
