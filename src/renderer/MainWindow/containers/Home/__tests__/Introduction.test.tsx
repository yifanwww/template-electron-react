import { describe, expect, it } from '@jest/globals';
import { render } from '@testing-library/react';
import type { AppDetails } from '@shared/apis/app';
import { Introduction } from '../Introduction';

describe(`Test component \`${Introduction.name}\``, () => {
    it('should render', () => {
        const appDetails: AppDetails = {
            name: 'template-electron-react',
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
