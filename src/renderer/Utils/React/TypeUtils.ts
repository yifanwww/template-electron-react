import { CSSProperties, ReactNode } from 'react';

export type ReactStyleFunc<
    Arg = undefined,
    Arg2 = undefined,
    Arg3 = undefined,
    Arg4 = undefined,
    Arg5 = undefined,
    Arg6 = undefined,
    Arg7 = undefined,
    Arg8 = undefined,
> = Arg extends undefined
    ? () => CSSProperties
    : Arg2 extends undefined
    ? (arg: Arg) => CSSProperties
    : Arg3 extends undefined
    ? (arg: Arg, arg2: Arg2) => CSSProperties
    : Arg4 extends undefined
    ? (arg: Arg, arg2: Arg2, arg3: Arg3) => CSSProperties
    : Arg5 extends undefined
    ? (arg: Arg, arg2: Arg2, arg3: Arg3, arg4: Arg4) => CSSProperties
    : Arg6 extends undefined
    ? (arg: Arg, arg2: Arg2, arg3: Arg3, arg4: Arg4, arg5: Arg5) => CSSProperties
    : Arg7 extends undefined
    ? (arg: Arg, arg2: Arg2, arg3: Arg3, arg4: Arg4, arg5: Arg5, arg6: Arg6) => CSSProperties
    : Arg8 extends undefined
    ? (arg: Arg, arg2: Arg2, arg3: Arg3, arg4: Arg4, arg5: Arg5, arg6: Arg6, arg7: Arg7) => CSSProperties
    : (arg: Arg, arg2: Arg2, arg3: Arg3, arg4: Arg4, arg5: Arg5, arg6: Arg6, arg7: Arg7, arg8: Arg8) => CSSProperties;

export interface ReactChildrenProp {
    children?: ReactNode;
}
