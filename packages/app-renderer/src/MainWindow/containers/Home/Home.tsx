import { useEffect } from 'react';

import { useAppDetails, useMainDispatchingThunks } from 'src/MainWindow/redux';

import { Introduction } from './components/Introduction';

import css from './Home.module.scss';

export function Home(): React.ReactNode {
    const appDetails = useAppDetails();
    const { prepareAppDetails } = useMainDispatchingThunks();

    useEffect(() => {
        void prepareAppDetails();
    }, [prepareAppDetails]);

    return (
        <div className={css.clientArea}>
            <Introduction appDetails={appDetails} />
        </div>
    );
}
