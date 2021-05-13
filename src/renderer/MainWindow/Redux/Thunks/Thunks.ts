import { actions } from '../Actions';
import { MainThunk } from '../types';

export function prepare(): MainThunk {
    return (dispatch) => {
        dispatch(actions._finishPreparing());
    };
}
