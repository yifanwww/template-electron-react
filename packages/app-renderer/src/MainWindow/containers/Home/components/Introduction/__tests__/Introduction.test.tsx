import type { AppDetails } from '@ter/app-common/apis/app';
import { render } from '@testing-library/react';

import { Introduction } from '../Introduction';

describe(`Test component \`${Introduction.name}\``, () => {
    it('should render', () => {
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

        const { asFragment, getByText } = render(<Introduction appDetails={appDetails} />);
        expect(asFragment()).toMatchSnapshot();
        const linkElement = getByText(/Learn template-electron-react/i);
        expect(linkElement).toBeInTheDocument();
    });
});
