import { ReactElement } from 'react';

import { InfoDisplay } from '../Components';

import scss from './RootLayout.module.scss';

export function RootLayout(): ReactElement {
    return (
        <div className={scss.Layout}>
            <InfoDisplay />
        </div>
    );
}
