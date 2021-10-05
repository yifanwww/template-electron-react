import { useMainSelector } from './useMainSelector';

export const useClientAreaSize = () => useMainSelector((state) => state.displayConfig.clientAreaSize);
