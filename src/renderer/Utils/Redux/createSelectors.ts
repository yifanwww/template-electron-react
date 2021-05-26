import { shallowEqual, useSelector as _useSelector } from 'react-redux';

/**
 * Create a selector with store type definition and using undefined as equalityFn be default.
 */
export function createTypedSelector<TStoreState>() {
    return function useSelector<TSelected = unknown>(
        selector: (state: TStoreState) => TSelected,
        equalityFn?: (left: TSelected, right: TSelected) => boolean,
    ): TSelected {
        return _useSelector(selector, equalityFn);
    };
}

/**
 * Create a selector with store type definition and using shallowEqual as equalityFn by default.
 */
export function createTypedShallowSelector<TStoreState>() {
    return function useShallowSelector<TSelected = unknown>(
        selector: (state: TStoreState) => TSelected,
        equalityFn: (left: TSelected, right: TSelected) => boolean = shallowEqual,
    ): TSelected {
        return _useSelector(selector, equalityFn);
    };
}
