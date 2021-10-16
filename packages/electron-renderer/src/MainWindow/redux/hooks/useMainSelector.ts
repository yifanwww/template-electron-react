import { TypedUseSelectorHook, useSelector } from 'react-redux';

import { IStoreState } from '../types';

export const useMainSelector: TypedUseSelectorHook<IStoreState> = useSelector;
