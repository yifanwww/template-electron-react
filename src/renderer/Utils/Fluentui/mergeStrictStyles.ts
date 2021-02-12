import { mergeStyles } from '@fluentui/react';

import { IStrictStyle } from './IStrictStyle';

export function mergeStrictStyles(...args: IStrictStyle[]) {
    return mergeStyles(...args);
}
