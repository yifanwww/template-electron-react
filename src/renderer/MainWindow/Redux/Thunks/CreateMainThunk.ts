import { thunkCreatorFactory } from '@tecra/utils-redux';

import { IStoreState } from '../Types';

export const createMainThunk = thunkCreatorFactory<IStoreState>();
