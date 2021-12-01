import scss from './Frameless.module.scss';

export interface FramelessWindowProps {}

export const FramelessWindow: React.FC<FramelessWindowProps> = (props) => {
    return <div id={scss.Window}>{props.children}</div>;
};
