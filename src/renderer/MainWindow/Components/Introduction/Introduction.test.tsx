import { render } from '@testing-library/react';

import { Introduction } from './Introduction';

test('renders learn @YSoftwareRepo/template-electron-cra link', () => {
    const { getByText } = render(<Introduction />);
    const linkElement = getByText(/Learn @YSoftwareRepo\/template-electron-cra/i);
    expect(linkElement).toBeInTheDocument();
});
