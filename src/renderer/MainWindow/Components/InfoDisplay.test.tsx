import { render } from '@testing-library/react';

import { InfoDisplay } from './InfoDisplay';

test('renders learn @YSoftwareRepo/template-electron-cra link', () => {
    const { getByText } = render(<InfoDisplay />);
    const linkElement = getByText(/Learn @YSoftwareRepo\/template-electron-cra/i);
    expect(linkElement).toBeInTheDocument();
});
