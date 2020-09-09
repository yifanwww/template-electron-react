import React from "react";
import { IpcRendererEvent } from "electron";

import { AbstractClientArea, Size } from "@ClientArea";

import { App } from "./App";

interface IProps { }
interface IState {
    clientAreaSize: Size;
}

class ClientArea extends AbstractClientArea<IProps, IState>
{
    // --------------------------------------------------------------------------------------- React

    public constructor(props: Readonly<IProps>) {
        super(props);

        this.state = {
            clientAreaSize: { width: 1280, height: 720 }
        };
    }

    public render(): JSX.Element {
        return <App />;
    }

    // -------------------------------------------------------------------------------- Ipc Receiver

    protected OnClientAreaInitialized = (event: IpcRendererEvent, clientAreaSize: Size): void => {
        console.log(clientAreaSize);
        this.setState({ clientAreaSize: clientAreaSize });
    }

    protected OnWindowResized = (event: IpcRendererEvent, clientAreaSize: Size): void => {
        console.log(clientAreaSize);
        this.setState({ clientAreaSize: clientAreaSize });
    }
}

export { ClientArea as ReactAppClientArea };
