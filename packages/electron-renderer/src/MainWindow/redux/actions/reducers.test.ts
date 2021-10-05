import { IAppDetails } from '@tecra/electron-common';
import { getInitialState, _actions, _reducer } from './slice';

describe('Test redux reducer `_setAppDetails`', () => {
    test('finishes preparing', () => {
        const prevState = getInitialState();

        const appDetails: IAppDetails = {
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
    test('finishes preparing', () => {
        const prevState = getInitialState();

        expect(_reducer(prevState, _actions._finishPreparing()).prepared).toMatchSnapshot();
    });
});
