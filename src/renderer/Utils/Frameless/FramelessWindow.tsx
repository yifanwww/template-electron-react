import { ReactElement } from 'react';

import scss from './Frameless.module.scss';

export interface IFramelessWindowProps {
    children?: ReactElement;
}

export function FramelessWindow(props: Readonly<IFramelessWindowProps>): ReactElement {
    // eslint-disable-next-line react/destructuring-assignment
    return <div id={scss.Window}>{props.children}</div>;
}
