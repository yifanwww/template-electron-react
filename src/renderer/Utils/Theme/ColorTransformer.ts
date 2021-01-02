export abstract class ColorTransformer {
    static readonly translucent = (color: string, level: string) => color + level;

    static readonly translucent00 = (color: string) => ColorTransformer.translucent(color, '00');
    static readonly translucent10 = (color: string) => ColorTransformer.translucent(color, '10');
    static readonly translucent20 = (color: string) => ColorTransformer.translucent(color, '20');
    static readonly translucent30 = (color: string) => ColorTransformer.translucent(color, '30');
    static readonly translucent40 = (color: string) => ColorTransformer.translucent(color, '40');
    static readonly translucent50 = (color: string) => ColorTransformer.translucent(color, '50');
    static readonly translucent60 = (color: string) => ColorTransformer.translucent(color, '60');
    static readonly translucent70 = (color: string) => ColorTransformer.translucent(color, '70');
    static readonly translucent80 = (color: string) => ColorTransformer.translucent(color, '80');
    static readonly translucent90 = (color: string) => ColorTransformer.translucent(color, '90');
    static readonly translucentA0 = (color: string) => ColorTransformer.translucent(color, 'A0');
    static readonly translucentB0 = (color: string) => ColorTransformer.translucent(color, 'B0');
    static readonly translucentC0 = (color: string) => ColorTransformer.translucent(color, 'C0');
    static readonly translucentD0 = (color: string) => ColorTransformer.translucent(color, 'D0');
    static readonly translucentE0 = (color: string) => ColorTransformer.translucent(color, 'E0');
    static readonly translucentF0 = (color: string) => ColorTransformer.translucent(color, 'F0');
}
