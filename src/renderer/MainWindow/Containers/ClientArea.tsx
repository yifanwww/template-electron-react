import { makeStyles } from '@fluentui/react';
import { memo } from 'react';

import { InfoDisplay } from '../Components';

const useClasses = makeStyles({ clientArea: { display: 'grid' } });

export const ClientArea = memo(function ClientArea() {
    const classes = useClasses();

    return (
        <div className={classes.clientArea}>
            <InfoDisplay />
        </div>
    );
});
