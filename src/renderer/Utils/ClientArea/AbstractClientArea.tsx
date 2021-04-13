import { Component, UIEvent, UIEventHandler } from 'react';

import { IClientAreaSize } from '#RUtils/GlobalTypes';

export abstract class AbstractClientArea<P = {}, S = {}> extends Component<P, S> {
    // ----------------------------------------------------------------------------------------------------------- React

    public constructor(props: Readonly<P>) {
        super(props);
    }

    public componentDidMount(): void {
        this.addWindowListeners();

        this.addIpcListeners();
        this.addIpcOnceListeners();
        this.sendIpcMessage();

        this.bOnceClientAreaInitialized();
    }

    public componentWillUnmount(): void {
        this.removeWindowListeners();
        this.removeIpcListeners();
    }

    // ------------------------------------------------------------------------------------------------ Window Listeners

    protected addWindowListeners(): void {
        window.onresize = this.bOnWindowResized as any;
    }

    protected removeWindowListeners(): void {
        window.onresize = null;
    }

    // ------------------------------------------------------------------------------------------------- Window Handlers

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    protected onceClientAreaInitialized(clientAreaSize: IClientAreaSize): void {}

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    protected onWindowResized(event: UIEvent, clientAreaSize: IClientAreaSize): void {}

    private bOnceClientAreaInitialized = () =>
        this.onceClientAreaInitialized({ height: window.innerHeight, width: window.innerWidth });

    private bOnWindowResized: UIEventHandler = (event) =>
        this.onWindowResized(event, { height: window.innerHeight, width: window.innerWidth });

    // --------------------------------------------------------------------------------------------------- Ipc Listeners

    protected addIpcOnceListeners(): void {}
    protected addIpcListeners(): void {}
    protected sendIpcMessage(): void {}
    protected removeIpcListeners(): void {}
}
