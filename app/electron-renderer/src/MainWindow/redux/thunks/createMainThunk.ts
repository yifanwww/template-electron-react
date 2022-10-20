import { thunkCreatorFactory } from '@tecra-pkg/utils-redux';

import { StoreState } from '../types';

export const createMainThunk = thunkCreatorFactory<StoreState>();
