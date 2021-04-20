import { ReduxHooksFactory } from '#RUtils/Redux';

import { GlobalStoreState, StoreState } from '../types';
import { globalStore } from '../globalStore';
import { actions } from '../slice';
import { thunks } from '../thunk';

export const {
    useReduxSelector: useMainSelector,
    useReduxActionsDispatch: useMainActionsDispatch,
    useReduxThunksDispatch: useMainThunksDispatch,
    useReduxDispatch: useMainDispatch,
} = ReduxHooksFactory<typeof actions, typeof thunks, StoreState, GlobalStoreState>(
    actions,
    thunks,
    globalStore.getGlobalState,
);