import React from "react";
import { Provider } from "react-redux";

import { AbstractClientArea, Size } from "@ClientArea";

import { App } from "./App";
import { Store } from "./Store";

interface ClientAreaState {
    clientAreaSize: Size;
}

class ClientArea extends AbstractClientArea<{}, ClientAreaState>
{
    // --------------------------------------------------------------------------------------- React

    public constructor(props: Readonly<{}>) {
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

    protected OnClientAreaInitialized = (event: any, clientAreaSize: Size): void => {
        console.log(clientAreaSize);
        this.setState({ clientAreaSize: clientAreaSize });
    }

    protected OnWindowResized = (event: any, clientAreaSize: Size): void => {
        console.log(clientAreaSize);
        this.setState({ clientAreaSize: clientAreaSize });
    }
}

export { ClientArea as ReactAppClientArea };
