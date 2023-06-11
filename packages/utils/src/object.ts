export class ObjectUtil {
    /**
     * Reverses the key-value pair of a **plain object**.
     * Be careful, it's better for your object to keep all values unique and `string`.
     *
     * @param obj A plain object: `{ [key]: value }`.
     * @returns A reversed plain object: `{ [value]: key }`.
     */
    static reverseKeyValue(obj: object): Record<string, string> {
        return Object.fromEntries(Object.entries(obj).map((pair) => pair.reverse()));
    }
}
