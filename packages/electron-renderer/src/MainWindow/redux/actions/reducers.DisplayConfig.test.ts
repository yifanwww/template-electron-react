import { getInitialState, _actions, _reducer } from './slice';

describe('Test redux reducer `updateClientAreaSize`', () => {
    it('updates client area size', () => {
        const prevState = getInitialState();

        expect(
            _reducer(prevState, _actions.updateClientAreaSize({ height: 123, width: 456 })).displayConfig,
        ).toMatchSnapshot();
    });
});
