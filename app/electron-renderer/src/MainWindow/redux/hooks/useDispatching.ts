import { useDispatchingActions, useDispatchingThunks } from '@tecra-pkg/utils-redux';

import { actions } from '../actions';
import { thunks } from '../thunks';

export const useMainDispatchingActions = () => useDispatchingActions(actions);
export const useMainDispatchingThunks = () => useDispatchingThunks(thunks);
