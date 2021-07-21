import { getInitialState } from './Slice';
import { store } from './Store';

describe('Test redux store', () => {
    test('get initial state', () => {
        expect(store.getState()).toStrictEqual(getInitialState());
    });
});
