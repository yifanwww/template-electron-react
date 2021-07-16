import { thunkCreatorFactory } from '#RUtils/Redux';

import { StoreState } from '../types';

export const createMainThunk = thunkCreatorFactory<StoreState>();
