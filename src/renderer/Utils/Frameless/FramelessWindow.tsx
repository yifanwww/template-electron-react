import { ReactElement, ReactNode } from 'react';

import scss from './FramelessWindow.module.scss';

export interface IFramelessWindowProps {
    children?: ReactNode;
}

export function FramelessWindow(props: Readonly<IFramelessWindowProps>): ReactElement {
    return <div id={scss.Root}>{props.children}</div>;
}
