import { makeStyles } from '@fluentui/react';
import { useEffect } from 'react';

import { Introduction } from '../components/Introduction';
import { useMainDispatchingThunks, usePrepared } from '../redux';

const useStyles = makeStyles({
    clientArea: {
        display: 'grid',
        overflow: 'hidden',
        userSelect: 'none',
    },
});

export function ClientArea(): React.ReactElement {
    const classes = useStyles();

    const prepared = usePrepared();
    const { prepare } = useMainDispatchingThunks();

    useEffect(prepare, [prepare]);

    return <div className={classes.clientArea}>{prepared && <Introduction />}</div>;
}
