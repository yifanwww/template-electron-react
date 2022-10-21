import { thunkCreatorFactory } from '@tecra-pkg/utils-redux';

import type { StoreState } from '../types';

export const createMainThunk = thunkCreatorFactory<StoreState>();
