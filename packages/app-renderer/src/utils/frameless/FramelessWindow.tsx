import css from './Frameless.module.scss';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface FramelessWindowProps {}

export function FramelessWindow({ children }: React.PropsWithChildren<FramelessWindowProps>): React.ReactNode {
    return <div id={css.window}>{children}</div>;
}
