import { thunkCreatorFactory } from '#RUtils/Redux';

import { IStoreState } from '../Types';

export const createMainThunk = thunkCreatorFactory<IStoreState>();
