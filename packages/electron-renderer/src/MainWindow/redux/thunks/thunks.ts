import { _actions } from '../actions';
import { createMainThunk } from './createMainThunk';

export const prepare = createMainThunk((dispatch) => {
    dispatch(_actions._finishPreparing());
});
