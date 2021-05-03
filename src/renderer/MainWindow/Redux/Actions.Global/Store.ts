import { configureGlobalStore } from '#RUtils/Redux';

import { GlobalStoreState } from '../types';

function getInitialGlobalState(): GlobalStoreState {
    return {};
}

export const globalStore = configureGlobalStore({ initialGlobalState: getInitialGlobalState() });
