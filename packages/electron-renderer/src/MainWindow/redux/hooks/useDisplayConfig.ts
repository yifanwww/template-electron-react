import { useMainSelector } from './useMainSelector';

export const useClientAreaSize = () => useMainSelector((state) => state.displayConfig.clientAreaSize);

export const usePrepared = () => useMainSelector((state) => state.displayConfig.prepared);
