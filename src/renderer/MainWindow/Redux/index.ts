import { GlobalStoreState, StoreState } from './types';
import { actions, store } from './Actions';
import { thunks } from './Thunks';

export { actions as mainActions };
export { store as mainStore };
export { thunks as mainThunks };

export type { GlobalStoreState as MainGlobalStoreState };
export type { StoreState as MainStoreState };

export * from './Hooks';
