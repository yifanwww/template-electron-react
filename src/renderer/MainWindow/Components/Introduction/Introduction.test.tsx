import { render } from '@testing-library/react';
import renderer from 'react-test-renderer';

import { Introduction } from './Introduction';

describe('Test component `Introduction`', () => {
    test('renders', () => {
        const reactElement = <Introduction />;

        const component = renderer.create(reactElement);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();

        const { getByText } = render(reactElement);
        const linkElement = getByText(new RegExp('Learn @YSoftwareRepo/template-electron-cra', 'i'));
        expect(linkElement).toBeInTheDocument();
    });
});
