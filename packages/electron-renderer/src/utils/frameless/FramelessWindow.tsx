import scss from './Frameless.module.scss';

export interface IFramelessWindowProps extends IChildrenProps {}

export function FramelessWindow(props: IFramelessWindowProps): React.ReactElement {
    return <div id={scss.Window}>{props.children}</div>;
}
