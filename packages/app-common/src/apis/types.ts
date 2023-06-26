import type { IpcMainEvent, IpcMainInvokeEvent, IpcRendererEvent } from 'electron';

export type IpcMainHandler<Return, Args extends unknown[]> = (event: IpcMainInvokeEvent, ...args: Args) => Return;

export type IpcMainListener<Args extends unknown[]> = (event: IpcMainEvent, ...args: Args) => void;

export type IpcRendererInvoker<Return, Args extends unknown[]> = (...args: Args) => Return;

export type IpcRendererListener<Args extends unknown[]> = (event: IpcRendererEvent, ...args: Args) => void;

export type IpcRendererInvokerAPI<Return, Args extends unknown[]> = {
    main: IpcMainHandler<Return | Promise<Return>, Args>;
    renderer: IpcRendererInvoker<Promise<Return>, Args>;
};
