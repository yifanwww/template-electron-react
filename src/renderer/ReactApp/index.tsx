import React from "react";
import { IpcRendererEvent } from "electron";
import { Provider } from "react-redux";

import { AbstractClientArea, Size } from "@ClientArea";

import { App } from "./App";
import { Store } from "./Store";

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
        return (
            <Provider store={Store}>
                <App />
            </Provider>
        );
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
