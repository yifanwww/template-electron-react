/* eslint-disable max-len */

import { IpcMainEvent, IpcMainInvokeEvent } from 'electron';

export type IpcMainHandler<ReturnType, Args extends unknown[]> = (
    event: IpcMainInvokeEvent,
    ...args: Args
) => ReturnType;

export type IpcMainListener<Args extends unknown[] = unknown[]> = (event: IpcMainEvent, ...args: Args) => void;
