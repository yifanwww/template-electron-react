import type { AppDetails } from '@tecra-pkg/electron-common';

import { getInitialState, _actions, _reducer } from './slice';

{
    const name = '_setAppDetails';

    describe(`Test redux reducer \`${name}\``, () => {
        it('should update app details', () => {
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

            expect(_reducer(prevState, _actions[name](appDetails)).appDetails).toMatchSnapshot();
        });
    });
}

{
    const name = '_finishPreparing';

    describe(`Test redux reducer \`${name}\``, () => {
        it('should finish preparing', () => {
            const prevState = getInitialState();

            expect(_reducer(prevState, _actions[name]()).prepared).toMatchSnapshot();
        });
    });
}
