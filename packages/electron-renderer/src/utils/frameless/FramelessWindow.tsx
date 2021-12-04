import scss from './Frameless.module.scss';

export interface FramelessWindowProps {}

export const FramelessWindow: React.FC<FramelessWindowProps> = ({ children }) => {
    return <div id={scss.Window}>{children}</div>;
};
