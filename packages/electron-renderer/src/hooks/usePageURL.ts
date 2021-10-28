import { useLocation } from 'react-router';

export const usePageURL = () => useLocation().hash.slice(1);
