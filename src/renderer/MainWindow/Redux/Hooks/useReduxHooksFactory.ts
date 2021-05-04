import { ReduxHooksFactory } from '#RUtils/Redux';

import { StoreState } from '../types';
import { actions, store } from '../Actions';
import { thunks } from '../Thunks';

export const {
    useReduxSelector: useMainSelector,
    useReduxDispatchedActions: useMainDispatchedActions,
    useReduxDispatchedThunks: useMainDispatchedThunks,
} = ReduxHooksFactory<typeof actions, typeof thunks, StoreState>(actions, thunks, store.dispatch);
