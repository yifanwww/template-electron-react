import type { AppDetails } from '@tecra/app-common';
import { render } from '@testing-library/react';
import renderer from 'react-test-renderer';

import { Introduction } from '../Introduction';

describe(`Test component \`${Introduction.name}\``, () => {
    it('should render', () => {
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

        const element = <Introduction appDetails={appDetails} />;

        expect(renderer.create(element).toJSON()).toMatchSnapshot();

        const { getByText } = render(element);
        const linkElement = getByText(/Learn template-electron-cra/i);
        expect(linkElement).toBeInTheDocument();
    });
});
