import { useMainSelector } from './useMainSelector';

export const useAppDetails = () => useMainSelector((state) => state.appDetails);

export const usePrepared = () => useMainSelector((state) => state.prepared);
