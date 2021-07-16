import { thunkCreatorFactory } from '#RUtils/Redux';

import { IStoreState } from '../types';

export const createMainThunk = thunkCreatorFactory<IStoreState>();
