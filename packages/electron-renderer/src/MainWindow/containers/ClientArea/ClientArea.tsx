import { useEffect } from 'react';

import { Introduction } from 'src/MainWindow/components/Introduction';
import { useAppDetails, useMainDispatchingThunks, usePrepared } from 'src/MainWindow/redux';

import scss from './ClientArea.module.scss';

export function ClientArea(): React.ReactElement {
    const appDetails = useAppDetails();
    const prepared = usePrepared();

    const { prepare } = useMainDispatchingThunks();

    useEffect(() => {
        prepare();
    }, [prepare]);

    return <div className={scss.clientArea}>{prepared && <Introduction appDetails={appDetails} />}</div>;
}
