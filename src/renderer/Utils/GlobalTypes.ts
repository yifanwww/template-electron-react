export interface IClientAreaSize {
    width: number;
    height: number;
}

export interface IElementSize {
    width: number;
    height: number;
}

export interface IElementPosition {
    left: number;
    top: number;
    width: number;
    height: number;
}

export interface IDotPosition {
    x: number;
    y: number;
}

export interface IRectPosition extends IElementPosition {}

export interface IOffset {
    x: number;
    y: number;
}
