import { createTypedSelector } from '@tecra/utils-redux';

import { IStoreState } from '../types';

export const useMainSelector = createTypedSelector<IStoreState>();
