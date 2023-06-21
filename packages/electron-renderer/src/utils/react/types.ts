export type ReactChildrenProps = React.PropsWithChildren<{}>;

export type ReactStyleFunc<Args extends unknown[]> = (...args: Args) => React.CSSProperties;

export interface ClientAreaSize {
    width: number;
    height: number;
}
