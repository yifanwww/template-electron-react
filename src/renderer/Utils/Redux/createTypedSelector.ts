import { useSelector } from 'react-redux';

/**
 * Create a selector with store type definition.
 */
export function createTypedSelector<TStoreState>() {
    return function useTypedSelector<TSelected = unknown>(
        selector: (state: TStoreState) => TSelected,
        equalityFn?: (left: TSelected, right: TSelected) => boolean,
    ): TSelected {
        return useSelector(selector, equalityFn);
    };
}
