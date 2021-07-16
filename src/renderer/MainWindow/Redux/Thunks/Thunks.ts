import { _actions } from '../Actions';
import { createMainThunk } from './CreateMainThunk';

export const prepare = createMainThunk((dispatch) => {
    dispatch(_actions._finishPreparing());
});
