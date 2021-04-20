import { useMainSelector } from './useReduxHooksFactory';

export const useClientAreaSize = () => useMainSelector((state) => ({ clientAreaSize: state.clientAreaSize }));
