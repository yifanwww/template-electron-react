import { IpcMainEvent, IpcMainInvokeEvent, IpcRendererEvent } from 'electron';

export type IpcMainHandler<ReturnType, Args extends unknown[]> = (
    event: IpcMainInvokeEvent,
    ...args: Args
) => ReturnType;

export type IpcMainListener<Args extends unknown[] = unknown[]> = (event: IpcMainEvent, ...args: Args) => void;

export type IpcRendererListener<Args extends unknown[] = unknown[]> = (event: IpcRendererEvent, ...args: Args) => void;
