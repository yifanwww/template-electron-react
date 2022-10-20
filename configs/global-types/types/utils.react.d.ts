declare interface ReactChildrenProps {
    children?: React.ReactNode;
}

declare type ReactStyleFunc<Args extends unknown[]> = (...args: Args) => React.CSSProperties;

declare interface ClientAreaSize {
    width: number;
    height: number;
}
