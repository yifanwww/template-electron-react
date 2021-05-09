export abstract class ColorTransformer {
    static readonly translucent = (color: string, level: string) => color + level;
    static readonly translucent00 = (color: string) => `${color}00`;
    static readonly translucent10 = (color: string) => `${color}10`;
    static readonly translucent20 = (color: string) => `${color}20`;
    static readonly translucent30 = (color: string) => `${color}30`;
    static readonly translucent40 = (color: string) => `${color}40`;
    static readonly translucent50 = (color: string) => `${color}50`;
    static readonly translucent60 = (color: string) => `${color}60`;
    static readonly translucent70 = (color: string) => `${color}70`;
    static readonly translucent80 = (color: string) => `${color}80`;
    static readonly translucent90 = (color: string) => `${color}90`;
    static readonly translucentA0 = (color: string) => `${color}a0`;
    static readonly translucentB0 = (color: string) => `${color}b0`;
    static readonly translucentC0 = (color: string) => `${color}c0`;
    static readonly translucentD0 = (color: string) => `${color}d0`;
    static readonly translucentE0 = (color: string) => `${color}e0`;
    static readonly translucentF0 = (color: string) => `${color}f0`;
}
