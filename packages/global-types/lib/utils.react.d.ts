declare interface IChildrenProps {
    children?: React.ReactNode;
}

declare interface IChildrenElementProps {
    children?: React.ReactElement;
}

declare type ReactStyleFunc<Args extends unknown[]> = (...args: Args) => React.CSSProperties;

declare interface IClientAreaSize {
    width: number;
    height: number;
}

declare interface IElementSize {
    width: number;
    height: number;
}

declare interface IElementPositionSize {
    left: number;
    top: number;
    width: number;
    height: number;
}
