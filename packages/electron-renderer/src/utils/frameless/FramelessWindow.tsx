import scss from './Frameless.module.scss';

export interface FramelessWindowProps extends ReactChildrenProps {}

export function FramelessWindow(props: FramelessWindowProps): React.ReactElement {
    return <div id={scss.Window}>{props.children}</div>;
}
