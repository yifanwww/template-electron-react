import type { IpcMainEvent, IpcMainInvokeEvent, IpcRendererEvent } from 'electron';

import type { UnknownFn } from '../types';

// Renderer Process Sending

export type IpcMainListener<PrototypeFn extends UnknownFn> = (
    event: IpcMainEvent,
    ...args: Parameters<PrototypeFn>
) => void;

// Renderer Process Invoking

export type IpcMainHandler<PrototypeFn extends UnknownFn> = (
    event: IpcMainInvokeEvent,
    ...args: Parameters<PrototypeFn>
) => Awaited<ReturnType<PrototypeFn>> | Promise<ReturnType<PrototypeFn>>;

export type IpcRendererInvoker<PrototypeFn extends UnknownFn> = (
    ...args: Parameters<PrototypeFn>
) => Promise<ReturnType<PrototypeFn>>;

// Main Process Sending

export type IpcRendererListener<PrototypeFn extends UnknownFn> = (
    event: IpcRendererEvent,
    ...args: Parameters<PrototypeFn>
) => void;

// For Defining APIs

export interface IpcRendererInvokerAPI<PrototypeFn extends UnknownFn> {
    main: IpcMainHandler<PrototypeFn>;
    renderer: IpcRendererInvoker<PrototypeFn>;
}

export interface IpcMainSenderAPI<PrototypeFn extends UnknownFn> {
    main: (...args: Parameters<PrototypeFn>) => void;
    renderer: (listener: IpcRendererListener<PrototypeFn>) => void;
}
