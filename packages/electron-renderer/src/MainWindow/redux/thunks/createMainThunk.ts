import { thunkCreatorFactory } from '@tecra/utils-redux';

import { StoreState } from '../types';

export const createMainThunk = thunkCreatorFactory<StoreState>();
