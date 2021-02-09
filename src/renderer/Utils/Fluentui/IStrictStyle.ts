import { IRawStyleBase } from '@fluentui/merge-styles/lib/IRawStyleBase';

/**
 * IStrictRawStyle extends a raw style object, allows selectors to be defined under the selectors
 * node but disallows css variables, strings, objects.
 */
export interface IStrictRawStyle extends IRawStyleBase {
    // /**
    //  * Allow css variables, strings, objects. While we should have more strict typing
    //  * here, partners are broken in many unpredictable cases where typescript can't infer
    //  * the right typing. Loosening the typing to both allow for css variables and other things.
    //  */
    // [key: string]: any;
    /**
     * Display name for the style.
     */
    displayName?: string;
    /**
     * @deprecated - The selectors wrapper is no longer required. You may add selectors as siblings
     * to other style properties, like most css-in-js libraries support.
     */
    selectors?: {
        [key: string]: IStrictStyle;
    };
}

export type IStrictStyleBase = IStrictRawStyle | string | false | null | undefined;

export type IStrictStyleBaseArray = Array<IStrictStyle>;

export type IStrictStyle = IStrictStyleBase | IStrictStyleBaseArray;
