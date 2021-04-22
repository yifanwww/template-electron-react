import { memo } from 'react';

import { InfoDisplay } from '../Components';

import scss from './ClientArea.module.scss';

export const ClientArea = memo(function ClientArea() {
    return (
        <div className={scss.Layout}>
            <InfoDisplay />
        </div>
    );
});
