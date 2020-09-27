import { IpcMainEvent, IpcMainInvokeEvent, IpcRendererEvent } from 'electron';

export type IpcMainFunc<Argument = undefined> = Argument extends undefined
    ? (event: IpcMainEvent) => void
    : (event: IpcMainEvent, argument: Argument) => void;

export type IpcMainInvokeFunc<Argument = undefined> = Argument extends undefined
    ? (event: IpcMainInvokeEvent) => void
    : (event: IpcMainInvokeEvent, argument: Argument) => void;

export type IpcRendererFunc<Argument = undefined> = Argument extends undefined
    ? (event: IpcRendererEvent) => void
    : (event: IpcRendererEvent, argument: Argument) => void;
