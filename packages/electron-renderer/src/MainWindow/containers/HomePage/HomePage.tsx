import { useEffect } from 'react';

import { Introduction } from 'src/MainWindow/components/Introduction';
import { useAppDetails, useMainDispatchingThunks } from 'src/MainWindow/redux';

export const HomePage: React.FC = () => {
    const appDetails = useAppDetails();
    const { prepareAppDetails } = useMainDispatchingThunks();

    useEffect(() => {
        void prepareAppDetails();
    }, [prepareAppDetails]);

    return <Introduction appDetails={appDetails} />;
};
