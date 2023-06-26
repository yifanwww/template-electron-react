import { useEffect } from 'react';

import { Introduction } from 'src/MainWindow/components/Introduction';
import { useAppDetails, useMainDispatchingThunks } from 'src/MainWindow/redux';

export function HomePage(): JSX.Element {
    const appDetails = useAppDetails();
    const { prepareAppDetails } = useMainDispatchingThunks();

    useEffect(() => {
        void prepareAppDetails();
    }, [prepareAppDetails]);

    return <Introduction appDetails={appDetails} />;
}
