import { AppDetails } from '@tecra/electron-common';
import { render } from '@testing-library/react';
import renderer from 'react-test-renderer';

import { Introduction } from './Introduction';

describe('Test component `Introduction`', () => {
    it('renders', () => {
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

        const reactElement = <Introduction appDetails={appDetails} />;

        const component = renderer.create(reactElement);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();

        const { getByText } = render(reactElement);
        const linkElement = getByText(/Learn template-electron-cra/i);
        expect(linkElement).toBeInTheDocument();
    });
});
