export interface ReactChildren {
    children?: React.ReactNode;
}

export type ReactStyleFunc<Args extends unknown[]> = (...args: Args) => React.CSSProperties;

export interface ClientAreaSize {
    width: number;
    height: number;
}
