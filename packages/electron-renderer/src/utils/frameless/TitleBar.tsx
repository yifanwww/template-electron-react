import { useEffect, useRef } from 'react';

import type { ClientAreaSize } from '../react';

import css from './Frameless.module.scss';

export interface TitleBarProps {
    onClientAreaSizeChange?: (clientAreaSize: ClientAreaSize) => void;
}

export function TitleBar({ children, onClientAreaSizeChange }: React.PropsWithChildren<TitleBarProps>): JSX.Element {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const changeClientAreaSize = () =>
            onClientAreaSizeChange?.({ height: ref.current!.clientHeight, width: ref.current!.clientWidth });

        changeClientAreaSize();

        window.addEventListener('resize', changeClientAreaSize);

        return () => {
            window.removeEventListener('resize', changeClientAreaSize);
        };
    }, [onClientAreaSizeChange]);

    return (
        <div id={css.TitleBar} ref={ref}>
            {children}
        </div>
    );
}
