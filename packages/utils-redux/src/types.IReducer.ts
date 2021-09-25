import { PayloadAction } from '@reduxjs/toolkit';

import { WritableDraft } from './types.WritableDraft';

export type IReducer<State, Payload> = (state: WritableDraft<State>, action: PayloadAction<Payload>) => void;
