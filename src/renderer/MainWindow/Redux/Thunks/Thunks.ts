import { _actions } from '../Actions';
import { MainThunk } from '../types';

export function prepare(): MainThunk {
    return (dispatch) => {
        dispatch(_actions._finishPreparing());
    };
}
