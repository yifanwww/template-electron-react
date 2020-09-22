export class WindowChannels {
    public static readonly Common = {
        WindowType: 'WT',
    };

    public static readonly MainWindow = {
        ClientAreaInitialized: 'MW-CAI',
        WindowResized: 'MW-WR',
        WindowToOpen: 'MW-WTO',
    };
}

export enum WindowType {
    MainWindow = 1,
}
