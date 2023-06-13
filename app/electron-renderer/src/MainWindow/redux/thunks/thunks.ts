import { IpcClient } from '@tecra-pkg/electron-common';

import { _actions } from '../actions';

import { createMainThunk } from './createMainThunk';

export const prepareAppDetails = createMainThunk(async (dispatch) => {
    const appDetails = await IpcClient.getAppDetails();
    dispatch(_actions._setAppDetails(appDetails));
});
