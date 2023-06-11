export class StringUtil {
    static isNilOrEmpty(value: unknown): value is undefined | null | '' {
        return value === undefined || value === null || value === '';
    }
}
