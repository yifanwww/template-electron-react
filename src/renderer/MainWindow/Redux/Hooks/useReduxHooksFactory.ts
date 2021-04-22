import { ReduxHooksFactory } from '#RUtils/Redux';

import { GlobalStoreState, StoreState } from '../types';
import { actions } from '../Actions';
import { globalStore } from '../Actions.Global';
import { thunks } from '../Thunks';

export const {
    useReduxSelector: useMainSelector,
    useReduxDispatchedActions: useMainDispatchedActions,
    useReduxDispatchedThunks: useMainDispatchedThunks,
} = ReduxHooksFactory<typeof actions, typeof thunks, StoreState, GlobalStoreState>(
    actions,
    thunks,
    globalStore.getGlobalState,
);
