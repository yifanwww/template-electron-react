import { WritableDraft } from 'immer/dist/types/types-external';

export type ReactImmerReducer<IContext, Action> = (state: WritableDraft<IContext>, action: Action) => void;
