import { createTypedSelector } from '#RUtils/Redux';

import { IStoreState } from '../Types';

export const useMainSelector = createTypedSelector<IStoreState>();
