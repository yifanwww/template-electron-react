import { HexDigit } from './base';

type IsHexColorNumber<Color extends string, Position extends number> = Position extends 0
    ? true
    : Color extends `${HexDigit}${infer R}`
    ? IsHexColorNumber<R, [-1, 0, 1, 2, 3, 4, 5][Position]>
    : false;

export type IsHexColor<Color extends string> = Color extends `#${infer R}` ? IsHexColorNumber<R, 6> : false;

export type MakeHexColor<Color extends string> = IsHexColor<Color> extends true ? Color : never;
