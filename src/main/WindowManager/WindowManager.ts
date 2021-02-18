import { Window } from './Window';
import { CloseWindowOption, CreateWindowOption } from './Window.types';

export class WindowManager {
    private count: number = 0;
    private store: { [id: string]: Window | undefined } = {};

    public createWindow = async (option: CreateWindowOption): Promise<void> => {
        this.count++;

        const { windowType } = option;
        const windowId = `${windowType}-${this.count}`;
        this.store[windowId] = new Window({
            windowId: '',
            windowType,
            height: option?.height,
            width: option?.width,
            onCloseWindow: this.closeWindow,
            onCreateWindow: this.createWindow,
        });

        this.store[windowId]!.show();
    };

    public closeWindow = async (option: CloseWindowOption): Promise<void> => {
        const { windowId } = option;

        this.store[windowId] = undefined;
    };
}
