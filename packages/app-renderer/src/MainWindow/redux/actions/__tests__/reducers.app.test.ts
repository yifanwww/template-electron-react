import { describe, expect, it } from '@jest/globals';
import type { AppDetails } from '@ter/app-common/apis/app';

import { getInitialState, _actions, _reducer } from '../slice';

{
    const name = '_setAppDetails';

    describe(`Test redux reducer \`${name}\``, () => {
        it('should update app details', () => {
            const prevState = getInitialState();

            const appDetails: AppDetails = {
                name: 'ter',
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
