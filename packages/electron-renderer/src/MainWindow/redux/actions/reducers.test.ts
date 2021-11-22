import { AppDetails } from '@tecra/electron-common';
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

        expect(_reducer(prevState, _actions._setAppDetails(appDetails)).appDetails).toMatchSnapshot();
    });
});

describe('Test redux reducer `_finishPreparing`', () => {
    it('finishes preparing', () => {
        const prevState = getInitialState();

        expect(_reducer(prevState, _actions._finishPreparing()).prepared).toMatchSnapshot();
    });
});
