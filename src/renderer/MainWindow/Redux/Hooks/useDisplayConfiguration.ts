import { useMainSelector } from './useTypedSelector';

export const useClientAreaSize = () => useMainSelector((state) => state.displayConfiguration.clientAreaSize);

export const usePrepared = () => useMainSelector((state) => state.displayConfiguration.prepared);
