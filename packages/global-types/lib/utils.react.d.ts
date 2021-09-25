interface IChildrenProps {
    children?: React.ReactNode;
}

interface IChildrenElementProps {
    children?: React.ReactElement;
}

type ReactStyleFunc<Args extends unknown[]> = (...args: Args) => React.CSSProperties;

interface IClientAreaSize {
    width: number;
    height: number;
}

interface IElementSize {
    width: number;
    height: number;
}

interface IElementPositionSize {
    left: number;
    top: number;
    width: number;
    height: number;
}
