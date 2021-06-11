/* eslint-disable max-len */

import { IpcMainEvent, IpcMainInvokeEvent, IpcRendererEvent } from 'electron';

// prettier-ignore
export type IpcMListener<
    Arg = undefined,
    Arg2 = undefined,
    Arg3 = undefined,
    Arg4 = undefined,
    Arg5 = undefined,
    Arg6 = undefined,
    Arg7 = undefined,
    Arg8 = undefined
> = Arg extends undefined ? (event: IpcMainEvent) => void :
    Arg2 extends undefined ? (event: IpcMainEvent, arg: Arg) => void :
    Arg3 extends undefined ? (event: IpcMainEvent, arg: Arg, arg2: Arg2) => void :
    Arg4 extends undefined ? (event: IpcMainEvent, arg: Arg, arg2: Arg2, arg3: Arg3) => void :
    Arg5 extends undefined ? (event: IpcMainEvent, arg: Arg, arg2: Arg2, arg3: Arg3, arg4: Arg4) => void :
    Arg6 extends undefined ? (event: IpcMainEvent, arg: Arg, arg2: Arg2, arg3: Arg3, arg4: Arg4, arg5: Arg5) => void :
    Arg7 extends undefined ? (event: IpcMainEvent, arg: Arg, arg2: Arg2, arg3: Arg3, arg4: Arg4, arg5: Arg5, arg6: Arg6) => void :
    Arg8 extends undefined
    ? (event: IpcMainEvent, arg: Arg, arg2: Arg2, arg3: Arg3, arg4: Arg4, arg5: Arg5, arg6: Arg6, arg7: Arg7) => void
    : (event: IpcMainEvent, arg: Arg, arg2: Arg2, arg3: Arg3, arg4: Arg4, arg5: Arg5, arg6: Arg6, arg7: Arg7, arg8: Arg8) => void;

// prettier-ignore
export type IpcMInvokeListener<
    Arg = undefined,
    Arg2 = undefined,
    Arg3 = undefined,
    Arg4 = undefined,
    Arg5 = undefined,
    Arg6 = undefined,
    Arg7 = undefined,
    Arg8 = undefined
> = Arg extends undefined ? (event: IpcMainInvokeEvent) => void :
    Arg2 extends undefined ? (event: IpcMainInvokeEvent, arg: Arg) => void :
    Arg3 extends undefined ? (event: IpcMainInvokeEvent, arg: Arg, arg2: Arg2) => void :
    Arg4 extends undefined ? (event: IpcMainInvokeEvent, arg: Arg, arg2: Arg2, arg3: Arg3) => void :
    Arg5 extends undefined ? (event: IpcMainInvokeEvent, arg: Arg, arg2: Arg2, arg3: Arg3, arg4: Arg4) => void :
    Arg6 extends undefined ? (event: IpcMainInvokeEvent, arg: Arg, arg2: Arg2, arg3: Arg3, arg4: Arg4, arg5: Arg5) => void :
    Arg7 extends undefined ? (event: IpcMainInvokeEvent, arg: Arg, arg2: Arg2, arg3: Arg3, arg4: Arg4, arg5: Arg5, arg6: Arg6) => void :
    Arg8 extends undefined
    ? (event: IpcMainInvokeEvent, arg: Arg, arg2: Arg2, arg3: Arg3, arg4: Arg4, arg5: Arg5, arg6: Arg6, arg7: Arg7) => void
    : (event: IpcMainInvokeEvent, arg: Arg, arg2: Arg2, arg3: Arg3, arg4: Arg4, arg5: Arg5, arg6: Arg6, arg7: Arg7, arg8: Arg8) => void;

// prettier-ignore
export type IpcRListener<
    Arg = undefined,
    Arg2 = undefined,
    Arg3 = undefined,
    Arg4 = undefined,
    Arg5 = undefined,
    Arg6 = undefined,
    Arg7 = undefined,
    Arg8 = undefined
> = Arg extends undefined ? (event: IpcRendererEvent) => void :
    Arg2 extends undefined ? (event: IpcRendererEvent, arg: Arg) => void :
    Arg3 extends undefined ? (event: IpcRendererEvent, arg: Arg, arg2: Arg2) => void :
    Arg4 extends undefined ? (event: IpcRendererEvent, arg: Arg, arg2: Arg2, arg3: Arg3) => void :
    Arg5 extends undefined ? (event: IpcRendererEvent, arg: Arg, arg2: Arg2, arg3: Arg3, arg4: Arg4) => void :
    Arg6 extends undefined ? (event: IpcRendererEvent, arg: Arg, arg2: Arg2, arg3: Arg3, arg4: Arg4, arg5: Arg5) => void :
    Arg7 extends undefined ? (event: IpcRendererEvent, arg: Arg, arg2: Arg2, arg3: Arg3, arg4: Arg4, arg5: Arg5, arg6: Arg6) => void :
    Arg8 extends undefined
    ? (event: IpcRendererEvent, arg: Arg, arg2: Arg2, arg3: Arg3, arg4: Arg4, arg5: Arg5, arg6: Arg6, arg7: Arg7) => void
    : (event: IpcRendererEvent, arg: Arg, arg2: Arg2, arg3: Arg3, arg4: Arg4, arg5: Arg5, arg6: Arg6, arg7: Arg7, arg8: Arg8) => void;
