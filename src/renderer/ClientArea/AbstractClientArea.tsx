import { Component } from "react";
import { IpcRendererEvent } from "electron";

const { ipcRenderer } = window.require("electron");

export interface Size {
    width: number;
    height: number;
}

export abstract class AbstractClientArea<P, S> extends Component<P, S>
{
    // --------------------------------------------------------------------------------------- React

    public componentDidMount(): void {
        ipcRenderer.on("ClientAreaInitialized", this.OnClientAreaInitialized);
        ipcRenderer.on("WindowResized", this.OnWindowResized);

        ipcRenderer.send("ClientAreaInitialized");
    }

    public componentWillUnmount(): void {
        ipcRenderer.removeListener("ClientAreaInitialized", this.OnClientAreaInitialized);
        ipcRenderer.removeListener("WindowResized", this.OnWindowResized);
    }

    // -------------------------------------------------------------------------------- Ipc Receiver

    protected OnClientAreaInitialized = (event: IpcRendererEvent, clientAreaSize: Size): void => { }

    protected OnWindowResized = (event: IpcRendererEvent, clientAreaSize: Size): void => { }
}
