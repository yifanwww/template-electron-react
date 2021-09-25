import scss from './Frameless.module.scss';

export interface IFramelessWindowProps {
    children?: React.ReactElement;
}

export function FramelessWindow(props: Readonly<IFramelessWindowProps>): React.ReactElement {
    // eslint-disable-next-line react/destructuring-assignment
    return <div id={scss.Window}>{props.children}</div>;
}
