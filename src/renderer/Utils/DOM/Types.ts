import { IElementPosition } from '#RUtils/Types';

export interface IDotPosition {
    x: number;
    y: number;
}

export interface IRectPosition extends IElementPosition {}

export interface ITextWithPosition {
    text: number | string;
    x: number;
    y: number;
}
