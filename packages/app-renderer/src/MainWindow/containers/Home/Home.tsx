import type { AppDetails } from '@app/common/apis/app';
import { useEffect, useState } from 'react';

import { getAppDetails } from 'src/apis/app';

import { Introduction } from './components/Introduction';

import css from './Home.module.scss';

export function Home() {
    const [appDetails, setAppDetails] = useState<AppDetails>();

    useEffect(() => {
        getAppDetails()
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
