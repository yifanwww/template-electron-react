import { makeStyles } from '@fluentui/react';
import { memo } from 'react';

import { InfoDisplay } from '../Components';

const useClassNames = makeStyles({ clientArea: { display: 'grid' } });

export const ClientArea = memo(function ClientArea() {
    const classNames = useClassNames();

    return (
        <div className={classNames.clientArea}>
            <InfoDisplay />
        </div>
    );
});
