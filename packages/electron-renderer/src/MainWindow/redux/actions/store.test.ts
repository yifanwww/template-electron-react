import { getInitialState } from './slice';
import { store } from './store';

describe('Test redux store', () => {
    test('get initial state', () => {
        expect(store.getState()).toStrictEqual(getInitialState());
    });
});
