import { useMainSelector } from './useReduxHooksFactory';

export const usePrepared = () => useMainSelector((state) => state.prepared);
