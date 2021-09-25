import { createTypedSelector } from '@tecra/utils-redux';

import { IStoreState } from '../Types';

export const useMainSelector = createTypedSelector<IStoreState>();
