import { getInitialState, _actions, _reducer } from './Slice';

describe('Test redux reducer `_finishPreparing`', () => {
    test('finishes preparing', () => {
        const prevState = getInitialState();

        expect(_reducer(prevState, _actions._finishPreparing())).toMatchSnapshot();
    });
});

describe('Test redux reducer `updateClientAreaSize`', () => {
    test('updates client area size', () => {
        const prevState = getInitialState();

        expect(_reducer(prevState, _actions.updateClientAreaSize({ height: 123, width: 456 }))).toMatchSnapshot();
    });
});
