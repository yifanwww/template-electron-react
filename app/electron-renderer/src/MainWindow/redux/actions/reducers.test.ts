import { AppDetails } from '@tecra-pkg/electron-common';
import { expectSnapshot } from '@tecra-pkg/utils-test';
import { getInitialState, _actions, _reducer } from './slice';

describe('Test redux reducer `_setAppDetails`', () => {
    it('updates app details', () => {
        const prevState = getInitialState();

        const appDetails: AppDetails = {
            name: 'tecra',
            version: 'unknown',
            module: {
                chrome: 'unknown',
                electron: 'unknown',
                node: 'unknown',
                v8: 'unknown',
            },
        };

        expectSnapshot(_reducer(prevState, _actions._setAppDetails(appDetails)).appDetails);
    });
});

describe('Test redux reducer `_finishPreparing`', () => {
    it('finishes preparing', () => {
        const prevState = getInitialState();

        expectSnapshot(_reducer(prevState, _actions._finishPreparing()).prepared);
    });
});
