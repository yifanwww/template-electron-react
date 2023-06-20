import css from './Frameless.module.scss';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface FramelessWindowProps {}

export const FramelessWindow: React.FC<FramelessWindowProps> = ({ children }) => {
    return <div id={css.Window}>{children}</div>;
};
