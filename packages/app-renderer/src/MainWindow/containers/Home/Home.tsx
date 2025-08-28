import type { AppDetails } from '@app/common/apis/app';
import { useEffect, useState } from 'react';

import { AppAPI } from 'src/apis';

import { Introduction } from './components/Introduction';

import css from './Home.module.scss';

export function Home(): React.ReactNode {
    const [appDetails, setAppDetails] = useState<AppDetails>();

    useEffect(() => {
        AppAPI.getAppDetails()
            .then(setAppDetails)
            .catch(() => {
                // stop error propagation
            });
    }, []);

    return (
        <div className={css.clientArea}>
            <Introduction appDetails={appDetails} />
        </div>
    );
}
