import css from './Frameless.module.scss';

export interface FramelessWindowProps {}

export const FramelessWindow: React.FC<FramelessWindowProps> = ({ children }) => {
    return <div id={css.Window}>{children}</div>;
};
