import { makeStyles } from '@fluentui/react';
import { memo, useEffect } from 'react';

import { InfoDisplay } from '../Components';
import { useMainDispatchedThunks } from '../Redux';

const useClasses = makeStyles({ clientArea: { display: 'grid' } });

export const ClientArea = memo(function ClientArea() {
    const classes = useClasses();

    const { prepare } = useMainDispatchedThunks();

    useEffect(() => prepare(), [prepare]);

    return (
        <div className={classes.clientArea}>
            <InfoDisplay />
        </div>
    );
});
