import { thunkCreatorFactory } from 'src/utils/redux';

import type { StoreState } from '../types';

export const createMainThunk = thunkCreatorFactory<StoreState>();
