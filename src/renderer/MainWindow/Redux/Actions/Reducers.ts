import { MainReducer } from '../types';

export const _finishPreparing: MainReducer = (state) => {
    state.prepared = true;
};
