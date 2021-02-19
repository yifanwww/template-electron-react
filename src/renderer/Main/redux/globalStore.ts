import { configureGlobalStore } from '#RUtils/Redux';

import { GlobalStoreState } from './types';

const initialGlobalState: GlobalStoreState = {};

export const globalStore = configureGlobalStore({ initialGlobalState });
