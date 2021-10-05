import { IpcClient } from '@tecra/electron-common';

import { _actions } from '../actions';
import { createMainThunk } from './createMainThunk';

export const prepare = createMainThunk(async (dispatch) => {
    const appDetails = await IpcClient.getAppDetails();
    dispatch(_actions._setAppDetails(appDetails));

    dispatch(_actions._finishPreparing());
});
