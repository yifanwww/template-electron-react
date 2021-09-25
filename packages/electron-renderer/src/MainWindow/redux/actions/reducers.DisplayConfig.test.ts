import { getInitialState, _actions, _reducer as __reducer } from './slice';

const _reducer = (...args: Parameters<typeof __reducer>) => __reducer(...args).displayConfig;

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
