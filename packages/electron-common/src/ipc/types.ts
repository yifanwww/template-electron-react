import type { IpcMainEvent, IpcMainInvokeEvent, IpcRendererEvent } from 'electron';

export type IpcMainHandler<Return extends Promise<unknown> | unknown, Args extends unknown[]> = (
    event: IpcMainInvokeEvent,
    ...args: Args
) => Return;

export type IpcMainListener<Args extends unknown[]> = (event: IpcMainEvent, ...args: Args) => void;

export type IpcRendererListener<Args extends unknown[]> = (event: IpcRendererEvent, ...args: Args) => void;
