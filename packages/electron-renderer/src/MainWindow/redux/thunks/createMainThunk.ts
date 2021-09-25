import { thunkCreatorFactory } from '@tecra/utils-redux';

import { IStoreState } from '../types';

export const createMainThunk = thunkCreatorFactory<IStoreState>();
