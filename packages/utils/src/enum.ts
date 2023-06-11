import { ObjectUtil } from './object';

export class EnumUtil {
    /**
     * Checks if the value is a member of a certain enum.
     */
    static is<T extends {}>(value: unknown, enumType: T): value is T[keyof T] {
        return Object.entries(enumType)
            .filter((pair) => Number.isNaN(Number(pair[0])))
            .some((pair) => value === pair[1]);
    }

    /**
     * Reverse the key-value pair of a string Enum. You don't need to reverse number Enum.
     *
     * Usage:
     * ```ts
     * const map: Record<xxxEnum, string> = EnumUtil.reverseKeyValue(xxxEnum);
     * ```
     *
     * You may need to cast the type to `Record<xxxEnum, string>`.
     */
    static reverseKeyValue(obj: Record<string, string>): Record<string, string> {
        return ObjectUtil.reverseKeyValue(obj);
    }
}
