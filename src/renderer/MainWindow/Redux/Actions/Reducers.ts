import { MainReducer } from '../types';

export const _finishPreparing: MainReducer = (state) => {
    state.displayConfiguration.prepared = true;
};
