import { mergeStyles } from '@fluentui/react';

import { IStrictStyle } from './IStrictStyle';

export const mergeStrictStyles = (...args: IStrictStyle[]) => mergeStyles(...args);
