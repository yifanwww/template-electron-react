import { configureGlobalStore } from '#RUtils/Redux';

export interface GlobalState {}

const initialGlobalState: GlobalState = {};

export const globalStore = configureGlobalStore({ initialGlobalState });
