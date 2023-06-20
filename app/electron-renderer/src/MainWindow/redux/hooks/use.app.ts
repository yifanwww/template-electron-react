import { useMainSelector } from './useMainSelector';

export const useAppDetails = () => useMainSelector((state) => state.appDetails);
