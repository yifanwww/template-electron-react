// These two type declarations are used to overwrite that two in `@types/node`.
declare function setInterval(handler: TimerHandler, timeout?: number, ...arguments: unknown[]): number;
declare function setTimeout(handler: TimerHandler, timeout?: number, ...arguments: unknown[]): number;

declare interface ReactChildrenProps {
    children?: React.ReactNode;
}

declare type ReactStyleFunc<Args extends unknown[]> = (...args: Args) => React.CSSProperties;

declare interface ClientAreaSize {
    width: number;
    height: number;
}
