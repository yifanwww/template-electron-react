import { expectSnapshot } from '@tecra-pkg/utils-test';

import { getInitialState, _actions, _reducer } from './slice';

describe('Test redux reducer `updateClientAreaSize`', () => {
    it('updates client area size', () => {
        const prevState = getInitialState();

        expectSnapshot(_reducer(prevState, _actions.updateClientAreaSize({ height: 123, width: 456 })).displayConfig);
    });
});
