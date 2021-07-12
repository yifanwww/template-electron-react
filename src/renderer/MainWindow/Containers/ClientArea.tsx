import { makeStyles } from '@fluentui/react';
import { memo, useEffect } from 'react';

import { InfoDisplay } from '../Components';
import { useMainDispatchingThunks } from '../Redux';

const useClassNames = makeStyles({ clientArea: { display: 'grid' } });

export const ClientArea = memo(function ClientArea() {
    const classNames = useClassNames();

    const { prepare } = useMainDispatchingThunks();

    useEffect(prepare, [prepare]);

    return (
        <div className={classNames.clientArea}>
            <InfoDisplay />
        </div>
    );
});
