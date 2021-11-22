import { TypedUseSelectorHook, useSelector } from 'react-redux';

import { StoreState } from '../types';

export const useMainSelector: TypedUseSelectorHook<StoreState> = useSelector;
