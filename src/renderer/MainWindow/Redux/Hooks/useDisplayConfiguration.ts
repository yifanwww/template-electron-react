import { useMainSelector } from './useTypedSelectors';

export const useClientAreaSize = () => useMainSelector((state) => state.displayConfiguration.clientAreaSize);

export const usePrepared = () => useMainSelector((state) => state.displayConfiguration.prepared);
