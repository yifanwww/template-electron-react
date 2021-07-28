import { makeStyles } from '@fluentui/react';
import { memo, useEffect } from 'react';

import { Introduction } from '../Components/Introduction';
import { useMainDispatchingThunks, usePrepared } from '../Redux';

const useStyles = makeStyles({ clientArea: { display: 'grid' } });

export const ClientArea = memo(function ClientArea() {
    const classes = useStyles();

    const prepared = usePrepared();
    const { prepare } = useMainDispatchingThunks();

    useEffect(prepare, [prepare]);

    return <div className={classes.clientArea}>{prepared && <Introduction />}</div>;
});
