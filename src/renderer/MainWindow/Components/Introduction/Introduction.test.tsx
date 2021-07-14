import { render } from '@testing-library/react';
import renderer from 'react-test-renderer';

import { Introduction } from './Introduction';

describe('Test component `Introduction`', () => {
    test('renders link', () => {
        const { getByText } = render(<Introduction />);
        const linkElement = getByText(new RegExp('Learn @YSoftwareRepo/template-electron-cra', 'i'));
        expect(linkElement).toBeInTheDocument();
    });

    test('[snapshot] renders', () => {
        const component = renderer.create(<Introduction />);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});
