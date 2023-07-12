export type ReactChildrenProps = React.PropsWithChildren<NonNullable<unknown>>;

export type ReactStyleFunc<Args extends unknown[]> = (...args: Args) => React.CSSProperties;

export interface ClientAreaSize {
    width: number;
    height: number;
}
