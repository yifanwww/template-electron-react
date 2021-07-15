import { makeStyles } from '@fluentui/react';
import { memo, useEffect } from 'react';

import { Introduction } from '../Components/Introduction';
import { useMainDispatchingThunks } from '../Redux';

const useClassNames = makeStyles({ clientArea: { display: 'grid' } });

export const ClientArea = memo(function ClientArea() {
    const classNames = useClassNames();

    const { prepare } = useMainDispatchingThunks();

    useEffect(prepare, [prepare]);

    return (
        <div className={classNames.clientArea}>
            <Introduction />
        </div>
    );
});
