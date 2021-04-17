import { ReactElement } from 'react';

import { InfoDisplay } from '../Components';

import scss from './ClientArea.module.scss';

export function ClientArea(): ReactElement {
    return (
        <div className={scss.Layout}>
            <InfoDisplay />
        </div>
    );
}
