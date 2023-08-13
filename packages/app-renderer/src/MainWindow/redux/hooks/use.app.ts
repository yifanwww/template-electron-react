import { useMainSelector } from './useSelector';

export const useAppDetails = () => useMainSelector((state) => state.appDetails);
