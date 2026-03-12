export class ArrayUtil {
    static filterFalsy<T>(arr: (T | undefined | null | false)[]): T[] {
        return arr.filter((item): item is T => !!item);
    }
}
