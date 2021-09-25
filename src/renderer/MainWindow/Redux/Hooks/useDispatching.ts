import { useDispatchingActions, useDispatchingThunks } from '@tecra/utils-redux';

import { actions } from '../Actions';
import { thunks } from '../Thunks';

export const useMainDispatchingActions = () => useDispatchingActions(actions);
export const useMainDispatchingThunks = () => useDispatchingThunks(thunks);
