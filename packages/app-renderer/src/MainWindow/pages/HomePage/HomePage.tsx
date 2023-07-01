import { useEffect } from 'react';

import { useAppDetails, useMainDispatchingThunks } from 'src/MainWindow/redux';

import { Introduction } from './components/Introduction';

export function HomePage(): JSX.Element {
    const appDetails = useAppDetails();
    const { prepareAppDetails } = useMainDispatchingThunks();

    useEffect(() => {
        void prepareAppDetails();
    }, [prepareAppDetails]);

    return <Introduction appDetails={appDetails} />;
}
