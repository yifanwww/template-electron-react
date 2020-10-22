export class ColorTransformer {
    public static transparent: string = 'transparent';

    public static translucent(color: string, level: string): string {
        return color + level;
    }

    public static translucent10(color: string): string {
        return ColorTransformer.translucent(color, '10');
    }

    public static translucent20(color: string): string {
        return ColorTransformer.translucent(color, '20');
    }

    public static translucent30(color: string): string {
        return ColorTransformer.translucent(color, '30');
    }

    public static translucent40(color: string): string {
        return ColorTransformer.translucent(color, '40');
    }

    public static translucent50(color: string): string {
        return ColorTransformer.translucent(color, '50');
    }

    public static translucent60(color: string): string {
        return ColorTransformer.translucent(color, '60');
    }

    public static translucent70(color: string): string {
        return ColorTransformer.translucent(color, '70');
    }

    public static translucent80(color: string): string {
        return ColorTransformer.translucent(color, '80');
    }

    public static translucent90(color: string): string {
        return ColorTransformer.translucent(color, '90');
    }

    public static translucentA0(color: string): string {
        return ColorTransformer.translucent(color, 'A0');
    }

    public static translucentB0(color: string): string {
        return ColorTransformer.translucent(color, 'B0');
    }

    public static translucentC0(color: string): string {
        return ColorTransformer.translucent(color, 'C0');
    }

    public static translucentD0(color: string): string {
        return ColorTransformer.translucent(color, 'D0');
    }

    public static translucentE0(color: string): string {
        return ColorTransformer.translucent(color, 'E0');
    }

    public static translucentF0(color: string): string {
        return ColorTransformer.translucent(color, 'F0');
    }
}
