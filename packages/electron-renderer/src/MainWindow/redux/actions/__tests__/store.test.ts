import { getInitialState } from '../slice';
import { store } from '../store';

describe('Test redux store', () => {
    it('should use initial state', () => {
        expect(store.getState()).toStrictEqual(getInitialState());
    });
});
