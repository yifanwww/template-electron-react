import css from './Frameless.module.scss';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface FramelessWindowProps {}

export function FramelessWindow({ children }: React.PropsWithChildren<FramelessWindowProps>): React.ReactNode {
    return <div id={css.Window}>{children}</div>;
}
