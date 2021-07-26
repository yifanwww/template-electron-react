import { ReactElement } from 'react';

import scss from './Frameless.module.scss';

export interface IFramelessWindowProps {
    children?: ReactElement;
}

export function FramelessWindow(props: Readonly<IFramelessWindowProps>): ReactElement {
    return <div id={scss.Window}>{props.children}</div>;
}
