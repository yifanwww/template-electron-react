import { CSSProperties } from 'react';

export type ReactStyleFunc<
    A = undefined,
    A2 = undefined,
    A3 = undefined,
    A4 = undefined,
    A5 = undefined,
    A6 = undefined,
    A7 = undefined,
    A8 = undefined
> = (
    arg?: A,
    arg2?: A2,
    arg3?: A3,
    arg4?: A4,
    arg5?: A5,
    arg6?: A6,
    arg7?: A7,
    arg8?: A8,
) => CSSProperties;
