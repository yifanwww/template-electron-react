import { useMainSelector } from './useReduxHooksFactory';

export const useClientAreaSize = () => useMainSelector((state) => state.clientAreaSize);
