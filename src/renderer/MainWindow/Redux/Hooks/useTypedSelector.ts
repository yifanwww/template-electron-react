import { createTypedSelector } from '#RUtils/Redux';

import { StoreState } from '../types';

export const useMainSelector = createTypedSelector<StoreState>();
