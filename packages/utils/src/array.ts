export class ArrayUtil {
    static filterFalsy<T extends object>(arr: (T | undefined | null | false)[]): T[] {
        return arr.filter((item): item is T => !!item);
    }

    /**
     * The TypeScript official signature of Array.prototype.includes doesn't allow `undefined` or `null`,
     * this method does.
     */
    static includes<T>(arr: T[], searchElement: T | undefined | null, fromIndex?: number): boolean {
        return (arr as (T | undefined | null)[]).includes(searchElement, fromIndex);
    }
}
