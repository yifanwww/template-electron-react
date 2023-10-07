import { useEffect } from 'react';

import { useAppDetails, useMainDispatchingThunks } from 'src/MainWindow/redux';

import { Introduction } from './components/Introduction';

import css from './ClientArea.module.scss';

export function ClientArea(): React.ReactNode {
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
