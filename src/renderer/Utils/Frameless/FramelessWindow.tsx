import { ReactElement, ReactNode } from 'react';

import scss from './Frameless.module.scss';

export interface IFramelessWindowProps {
    children?: ReactNode;
}

export function FramelessWindow(props: Readonly<IFramelessWindowProps>): ReactElement {
    return <div id={scss.FramelessWindow}>{props.children}</div>;
}
