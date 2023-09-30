import { AppAPI } from 'src/apis';

import { _actions } from '../actions';

import { createMainThunk } from './createThunk';

export const prepareAppDetails = createMainThunk(async (dispatch) => {
    const appDetails = await AppAPI.getAppDetails();
    dispatch(_actions._setAppDetails(appDetails));
});
